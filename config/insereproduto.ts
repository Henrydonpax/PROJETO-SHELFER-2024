import { IntegerType } from 'typeorm'
import db from  './conexao'
import Novoproduto from './routes'

export default (Cadproduto:any) => {

exports.insereNome = function (idfornecedor:IntegerType,nome:IntegerType,preco:IntegerType,idestoque:IntegerType,quantidade:IntegerType,idcategoria:IntegerType,lote:IntegerType,datavalidade:IntegerType){
async function inserirdados(idfornecedor:IntegerType,nome:IntegerType,preco:IntegerType,idestoque:IntegerType,quantidade:IntegerType,idcategoria:IntegerType,lote:IntegerType,datavalidade:IntegerType){
    await db.connect()
    const Novoproduto='insert into produtos (idfornecedor,nome,preco,idestoque,quantidade,idcategoria,lote,datavalidade) values ($1,$2,$3,$4,$5,$6,$7,$8)'
    await db.query(Novoproduto,[idfornecedor,nome,preco,idestoque,quantidade,idcategoria,lote,datavalidade])
    console.log('Inserção realiazada com sucesso')
    await db.end()

   }
   return(inserirdados(idfornecedor,nome,preco,idestoque,quantidade,idcategoria,lote,datavalidade))
}
}


