const db=require('./conexao')

async function removerregistro(){
    await  db.connect()
    const excluir="DELETE FROM PRODUTOS WHERE idproduto = 7"
    await db.query(excluir)
    await db.end()
    console.log("excluido com sucesso")

}


removerregistro()