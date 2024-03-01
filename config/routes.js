const express = require('express');
const routes = express.Router();
const path = require('path');
const Cadproduto = require('./insereproduto.js');
const Cadusuario = require('./insereusuario.js')
const cors = require('cors');
const db = require('./conexao');
const client = require('./conexao');
const { obterInformacoesSistema } = require('./informacoesSistema');
const passport = require('passport');
require('./auth'); 

routes.use(express.json());
routes.use(express.urlencoded({ extended: true }));


routes.post('/login', passport.authenticate('local', {
  successRedirect: '/home',
  
  failureFlash:true
}));


routes.get('/login', function (req, res) {
  res.sendFile(path.join(__dirname + '../../public/index2.html'))
})



routes.post('/home', async (req, res) => {
  try {
    await db.connect();
    const informacoes = await obterInformacoesSistema();
    res.json({ success: true, informacoes });
  } catch (error) {
    console.error('Erro ao obter informações do sistema:', error);
    res.status(500).json({ success: false, message: 'Erro interno do servidor' });
  }
  finally {
    await db.end();
  }
});


routes.get('/home', function (req, res) {
res.sendFile(path.join(__dirname + '../../public/home2.html'))
})


routes.get('/produtos', function (req, res) {
  res.sendFile(path.join(__dirname + "../../public/produtos2.html"))
})


routes.get('/cad-produtos', function (req, res) {
  res.sendFile(path.join(__dirname + "../../public/cadastroprodutos2.html"))

})

routes.post('/cad-produtos', function (req, res) {
  Cadproduto.insereNome(req.body.idfornecedor, req.body.nome, req.body.preco, req.body.idestoque, req.body.quantidade, req.body.categoria, req.body.lote, req.body.datavalidade).then(function () {
    res.send("Produto cadastrado com sucesso")
  }).catch(function (erro) {
    res.send("Não foi possivel finalizar o cadastro" + erro)
  })

})


routes.get('/cad-usuarios', function (req, res) {
  res.sendFile(path.join(__dirname + "../../public/cadastrousuarios.html"))
})


routes.post('/cad-usuarios', async function (req, res) {
  try {
    await db.connect();
    await Cadusuario.insereUsu(req.body.email, req.body.cpf, req.body.senha, req.body.nome);
    res.send('<script>alert("Usuário cadastrado com sucesso"); window.location="/cad-usuarios";</script>');
  } catch (erro) {
    console.error('Erro ao obter informações do sistema:', erro);
    res.send("Não foi possível finalizar o cadastro" + erro);
  } finally {
    await db.end();
  }
});




module.exports = routes

