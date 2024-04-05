const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('./conexao');



passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'senha'
},
async function (email, senha, done) {
  try {
    await db.connect();
    const result = await db.query('SELECT * FROM USUARIOS WHERE email = $1 AND senha = $2', [email, senha]);
    
    if (result.rows.length === 0) {
      return done(null, false, { message: 'Credenciais inválidas' });
    }
    
    return done(null, result.rows[0]);
  } catch (error) {
    console.error('Erro ao consultar o banco de dados:', error);
    return done(error);
  }finally{
   await db.end();
   }
}));




// const users = [{
//     email: 'gustavohenrique.baldin@gmail.com',
//     senha: '1234567'
// }];

// // passport.use(new LocalStrategy({
// //     usernameField: 'email',
//     passwordField: 'senha'
//   },
//   async function(email, senha, done) {
//     try {
//       // Verifica o usuário
//       const user = users.find(user => user.email === email);
//       if (!user) {
//         return done(null, false, { message: 'Usuário não encontrado' });
//       }
//       // Verifica a senha 
//       if (user.senha !== senha) {
//         return done(null, false, { message: 'Senha incorreta' });
//       }

//       return done(null, user);
//     } catch (error) {
//       console.error('Erro durante autenticação:', error);
//       return done(error); 
//     }
//   }
// ));

passport.serializeUser((user, done) => {
  done(null, user.email);
});

passport.deserializeUser(async (email, done) => {
  try {
    await db.connect();
    const result = await db.query('SELECT * FROM usuarios WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return done(new Error('Usuário não encontrado'));
    }
    
    return done(null, result.rows[0]);
  } catch (error) {
    console.error('Erro ao consultar o banco de dados:', error);
    return done(error);
  } finally{
    await db.end()
  }
});

module.exports = passport;