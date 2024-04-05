import db from  './conexao'
const Novoproduto = require('./routes')

exports.insereNome = function (idfornecedor,nome,preco,idestoque,quantidade,idcategoria,lote,datavalidade){
async function inserirdados(idfornecedor,nome,preco,idestoque,quantidade,idcategoria,lote,datavalidade){
    await db.connect()
    const Novoproduto='insert into produtos (idfornecedor,nome,preco,idestoque,quantidade,idcategoria,lote,datavalidade) values ($1,$2,$3,$4,$5,$6,$7,$8)'
    await db.query(Novoproduto,[idfornecedor,nome,preco,idestoque,quantidade,idcategoria,lote,datavalidade])
    console.log('Inserção realiazada com sucesso')
    await db.end()

   }
   return(inserirdados(idfornecedor,nome,preco,idestoque,quantidade,idcategoria,lote,datavalidade))
}


