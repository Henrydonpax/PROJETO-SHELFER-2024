import { IntegerDataType } from 'sequelize'
import db from './conexao'

export async function LstProd(idproduto:IntegerDataType,idfornecedor:IntegerDataType,nome:string,preco:IntegerDataType,idestoque:IntegerDataType,quantidade:IntegerDataType,idcategoria:IntegerDataType,lote:IntegerDataType,datavalidade:IntegerDataType){
    try{
        const Lista = 'SELECT idproduto,idfornecedor,nome,preco,idestoque,quantidade,idcategoria,lote,datavalidade FROM PRODUTOS values ($1,$2,$3,$4,$5,$6,$7,$8,$9)'
        await db.query(Lista,[idproduto,idfornecedor,nome, preco,idestoque,quantidade,idcategoria,lote,datavalidade])
    }

}