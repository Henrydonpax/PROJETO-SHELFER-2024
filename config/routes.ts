import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import {InsereProd} from './insereproduto';
import {InsereUsu} from './insereusuario';
import db from './conexao';
import obterInformacoesSistema  from './informacoesSistema';
import passport from 'passport';
import './auth';
import jwt from 'jsonwebtoken';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

const routes = express.Router();


db.connect()
  .then(() => console.log('Conexão com o banco de dados estabelecida'))
  .catch(err => console.error('Erro ao conectar ao banco de dados:', err));

routes.use(express.json());
routes.use(express.urlencoded({ extended: true }));




const AUTH_COOKIE_NAME = 'auth-token';
const REFRESH_COOKIE_NAME = 'refresh-token';
const JWT_SECRET = 'zkB2&a629SXUY%eWsvxnH%BVp!jmDe7a$BZTbFjJEMmJDNG8Ly!WiuuTrSbQUdufwN8$9L3^Z!#7ZugrWf64&7fEzC'; 
const JWT_EXPIRATION = '15m';
const REFRESH_TOKEN_EXPIRATION = '7d';


// Estratégia JWT para verificar tokens nas requisições
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET
};

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
  try {
      const result = await db.query('SELECT * FROM usuarios WHERE email = $1', [jwt_payload.email]);
      if (result.rows.length === 0) {
          return done(null, false);
      }
      return done(null, result.rows[0]);
  } catch (error) {
      console.error('Erro ao consultar o banco de dados:', error);
      return done(error, false);
  }
}));

// Função para gerar tokens JWT
const generateTokens = (email: string) => {
  const authToken = jwt.sign({ email }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
  const refreshToken = jwt.sign({ email }, JWT_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRATION });
  return { authToken, refreshToken };
};

// Rota de login
routes.post('/login', function(req: Request, res: Response, next: NextFunction) {
  passport.authenticate('local', function(err: any, user: { email: string; }, info: { message: string | number | boolean; }) {
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
          // Se o login for bem-sucedido, gere os tokens JWT
          const { authToken, refreshToken } = generateTokens(user.email);
          res.cookie(AUTH_COOKIE_NAME, authToken, { 
              httpOnly: true, 
              secure: true, 
              sameSite: 'strict' 
          });
          res.cookie(REFRESH_COOKIE_NAME, refreshToken, { 
              httpOnly: true, 
              secure: true, 
              sameSite: 'strict' 
          });
          // Redirecione para a página inicial
          return res.redirect('/home');
      });
  })(req, res, next);
});


routes.get('/login', function (_req: Request, res: Response) {
  res.sendFile(path.join(__dirname + "../../public/index2.html"));
});


// Endpoint de logout
routes.post('/logout', (req: Request, res: Response) => {
  res.clearCookie(AUTH_COOKIE_NAME);
  res.clearCookie(REFRESH_COOKIE_NAME);
  res.json({ message: 'Logout successful' });
});

// Endpoint para refresh token
routes.post('/refresh', (req: Request, res: Response) => {
  const refreshToken = req.cookies[REFRESH_COOKIE_NAME];
  if (refreshToken) {
      jwt.verify(refreshToken, JWT_SECRET, (err: any, decoded: any) => {
          if (err) return res.status(401).send('Unauthorized');
          const { authToken, refreshToken: newRefreshToken } = generateTokens(decoded.email);
          res.cookie(AUTH_COOKIE_NAME, authToken, { 
              httpOnly: true, 
              secure: true, 
              sameSite: 'strict' 
          });
          res.cookie(REFRESH_COOKIE_NAME, newRefreshToken, { 
              httpOnly: true, 
              secure: true, 
              sameSite: 'strict' 
          });
          res.send('Tokens refreshed');
      });
  } else {
      res.status(401).send('Unauthorized');
  }
});

// Endpoint protegido
routes.get('/protected', passport.authenticate('jwt', { session: false }), (req: Request, res: Response) => {
  res.send(`Hello. This is a protected route`);
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



// Cookies de desempenho, anúncio e personalização
routes.get('/set-performance-cookie', (req: Request, res: Response) => {
  res.cookie('performance-cookie', 'performanceData', { 
      maxAge: 3600000, sameSite: 'lax' 
  });
  res.send('Performance cookie set');
});

routes.get('/set-ad-cookie', (req: Request, res: Response) => {
  res.cookie('ad-cookie', 'adPreferences', { 
      maxAge: 3600000, sameSite: 'lax' 
  });
  res.send('Ad cookie set');
});

routes.get('/set-personalization-cookie', (req: Request, res: Response) => {
  res.cookie('personalization-cookie', 'userPreferences', { 
      maxAge: 3600000, sameSite: 'lax' 
  });
  res.send('Personalization cookie set');
});


export default routes ;
