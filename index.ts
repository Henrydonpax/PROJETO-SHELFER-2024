console.log("WORKING WELL");

import express from 'express';
const app = express();
import routes from './config/routes';
const port = 8080;
import passport from 'passport';
const LocalStrategy = require('passport-local').Strategy;
import session from 'express-session';
import errorHandler from 'ts/ErrorHandler';

app.use(session({
    secret: 'segredo',
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

app.use(errorHandler);



app.listen(port, () => { console.log(`Server is running at http://localhost:${port}`);
});




