const db=require('./conexao')

async function alteraregistro(){
    await db.connect()
    const atualiza='update produtos set (preco * 1.1) where idcategoria = 2'
    await db.query(atualiza)
    await db.end()
    console.log('Registro alterado com sucesso')
}

alteraregistro()


