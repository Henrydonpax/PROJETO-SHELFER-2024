import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import Cadproduto from './insereproduto';
import Cadusuario from './insereusuario';
import db from './conexao';
import obterInformacoesSistema  from './informacoesSistema';
import passport from 'passport';
import './auth';

const routes = express.Router();




routes.use(express.json());
routes.use(express.urlencoded({ extended: true }));




//Rota passport
routes.post('/login', passport.authenticate('local', {
  successRedirect: '/home',
}));

routes.get('/login', function (_req: Request, res: Response) {
  res.sendFile(path.join(__dirname + '../../public/index2.html'));
});




routes.post('/home', async (_req: Request, res: Response) => {
  try {
    await db.connect();
    const informacoes = await obterInformacoesSistema();
    res.json({ success: true, informacoes });
  } catch (error) {
    console.error('Erro ao obter informações do sistema:', error);
    res.status(500).json({ success: false, message: 'Erro interno do servidor' });
  } finally {
    await db.end();
  }
});

routes.get('/home', function (_req: Request, res: Response) {
  res.sendFile(path.join(__dirname + '../../public/home2.html'));
});




routes.get('/cad-produtos', function (_req: Request, res: Response) {
  res.sendFile(path.join(__dirname + '../../public/cadastroprodutos2.html'));
});

routes.post('/cad-produtos', function (req: Request, res: Response) {
  Cadproduto.NovoProduto(req.body.idfornecedor,req.body.nome, req.body.preco, req.body.idestoque, req.body.quantidade, req.body.categoria, req.body.lote, req.body.datavalidade)
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
    await db.connect();
    await Cadusuario.insereUsu(req.body.email, req.body.cpf, req.body.senha, req.body.nome);
    res.send('<script>alert("Usuário cadastrado com sucesso"); window.location="/cad-usuarios";</script>');
  } catch (erro) {
    console.error('Erro ao obter informações do sistema:', erro);
    res.send('Não foi possível finalizar o cadastro' + erro);
  } finally {
    await db.end();
  }
});

export default routes ;
