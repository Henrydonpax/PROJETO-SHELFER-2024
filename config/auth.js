const express= require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


const users = [{

    email: 'gustavohenrique.baldin@gmail.com',
    senha: '1234567'

}]


passport.use(new LocalStrategy({
    usernameField: 'email', 
    passwordField: 'senha'  
  },

  async function(email, senha, done) {
    try {
      // Verifique se o usuário existe na lista de usuários
      const users = usuarios.find(user => user.email === email);
      if (!usuario) {
        return done(null, false, { message: 'Usuário não encontrado' });
      }
      // Verifique se a senha está correta
      if (usuario.senha !== senha) {
        return done(null, false, { message: 'Senha incorreta' });
      }
      
      return done(null, usuario);
    } catch (error) {
      
      console.error('Erro durante autenticação:', error);
      return done(error); 
    }
  }
));

module.exports = passport
