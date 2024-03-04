console.log("WORKING WELL");

const express = require('express');
const app = express();
const routes=require('./config/routes')
const port = 8080;
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

app.use(session({
    secret: 'seu_segredo', // Uma chave secreta para assinar o cookie da sessão
    resave: false,
    saveUninitialized: false
  }));

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(passport.initialize());
app.use(passport.session());
  

// arquivos estáticos
app.use(express.static(__dirname + '/public'));

app.use(express.static(__dirname + '/imgs'));

app.use(routes);



app.listen(port, () => { console.log(`Server is running at http://localhost:${port}`);
});




