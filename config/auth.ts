import { Strategy as LocalStrategy } from 'passport-local';
import passport from 'passport';
import db from './conexao';


db.connect()
  .then(() => console.log('Conexão com o banco de dados estabelecida'))
  .catch(err => console.error('Erro ao conectar ao banco de dados:', err));



passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'senha'
}, async function (email: string, senha: string, done: Function) {
    try {
       
        const result = await db.query('SELECT * FROM usuarios WHERE email = $1 AND senha = $2', [email, senha]);

        if (result.rows.length === 0) {
            return done(null, false, { message: 'Credenciais inválidas' });
        }

        return done(null, result.rows[0]);
    } catch (error) {
        console.error('Erro ao consultar o banco de dados:', error);
        return done(error);
    } 
}));

passport.serializeUser((user: any, done: Function) => {
  done(null, user.email);
});

passport.deserializeUser(async (email: string, done: Function) => {
    try {
        
        const result = await db.query('SELECT * FROM usuarios WHERE email = $1', [email]);

        if (result.rows.length === 0) {
            return done(new Error('Usuário não encontrado'));
        }

        return done(null, result.rows[0]);
    } catch (error) {
        console.error('Erro ao consultar o banco de dados:', error);
        return done(error);
    } 
    
});

export default passport;
