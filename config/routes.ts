import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import {InsereProd} from './insereproduto';
import {InsereUsu} from './insereusuario';
import db from './conexao';
import obterInformacoesSistema  from './informacoesSistema';
import passport from 'passport';
import './auth';

const routes = express.Router();


db.connect()
  .then(() => console.log('Conexão com o banco de dados estabelecida'))
  .catch(err => console.error('Erro ao conectar ao banco de dados:', err));



routes.use(express.json());
routes.use(express.urlencoded({ extended: true }));




routes.post('/login', function(req: Request, res: Response, next: NextFunction) {
  passport.authenticate('local', function(err: any, user: Express.User, info: { message: string | number | boolean; }) {
    if (err) { 
      return next(err); 
    }
    if (!user) { 
      // Se não houver usuário, redirecione para a página de login com uma mensagem de erro
      return res.redirect('/login?error=' + encodeURIComponent(info.message));
    }
    req.logIn(user, function(err) {
      if (err) { 
        return next(err); 
      }
      // Se o login for bem-sucedido, redirecione para a página inicial
      return res.redirect('/home');
    });
  })(req, res, next);
});

routes.get('/login', function (_req: Request, res: Response) {
  res.sendFile(path.join(__dirname + "../../public/index2.html"));
});




routes.post('/home', async (_req: Request, res: Response) => {
  try {
    const informacoes = await obterInformacoesSistema();
    res.json({ success: true, informacoes });
  } catch (error) {
    console.error('Erro ao obter informações do sistema:', error);
    res.status(500).json({ success: false, message: 'Erro interno do servidor' });
  } 
});

routes.get('/home', function (_req: Request, res: Response) {
  res.sendFile(path.join(__dirname + '../../public/home2.html'));
});



routes.get('/produtos', function(_req: Request, res:Response){
  res.sendFile(path.join(__dirname + '../../public/menuprodutos.html'));
});


routes.post('/produtos', function(_req:Request, res:Response){

});





routes.get('/cad-produtos', function (_req: Request, res: Response) {
  res.sendFile(path.join(__dirname + '../../public/cadastroprodutos2.html'));
});

routes.post('/cad-produtos', async function (req: Request, res: Response) {
   await InsereProd(req.body.idfornecedor,req.body.nome, req.body.preco, req.body.idestoque, req.body.quantidade, req.body.categoria, req.body.lote, req.body.datavalidade)
    .then(function () {
      res.send('Produto cadastrado com sucesso');
    })
    .catch(function (erro:any) {
      res.send('Não foi possível finalizar o cadastro' + erro);
    });
});




routes.get('/cad-usuarios', function (_req: Request, res: Response) {
  res.sendFile(path.join(__dirname + '../../public/cadastrousuarios.html'));
});

routes.post('/cad-usuarios', async function (req: Request, res: Response) {
  try {
      const { email, cpf, senha, nome } = req.body;
      await InsereUsu(email, cpf, senha, nome);
      console.log('Usuário cadastrado com sucesso');
      res.redirect('/login')
  } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      if (error instanceof Error) {
          res.status(400).json({ success: false, message: error.message }); // Enviar mensagem de erro para o cliente
      } else {
          res.status(400).json({ success: false, message: 'Erro desconhecido' }); // Enviar mensagem de erro para o cliente
      }
  }
});

export default routes ;
