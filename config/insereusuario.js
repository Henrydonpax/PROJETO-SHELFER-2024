const db=require ('./conexao')
const Novousuario= require('./routes')

exports.insereUsu = function (email,cpf,senha,nome){
async function inserirInfo(email,cpf,senha,nome){
  
    const Novousuario='insert into usuarios(email,cpf,senha,nome) values ($1,$2,$3,$4)'
    await db.query(Novousuario,[email,cpf,senha,nome])
    console.log('Inserção realiazada com sucesso')
    

   }
   return(inserirInfo(email,cpf,senha,nome))
}

