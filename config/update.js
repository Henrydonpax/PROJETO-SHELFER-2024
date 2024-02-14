const db = require('./conexao')

async function update1(){
    await db.connect()
    resultado=await db.query("update produtos set preco = 120 where idproduto = 7 ")
    console.log(resultado.rows)
    await db.end()
    console.log("Alteração concluida com sucesso")
}

update1()