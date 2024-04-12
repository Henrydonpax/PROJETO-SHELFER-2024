
import db from './conexao'

export default (Cadproduto: any) => {

    ////////se o tipo de algum parametro for number ele não funciona////////////
    async function inserirdados(idfornecedor: string, nome: string, preco: string, idestoque: string, quantidade: string, idcategoria: string, lote: string, datavalidade: string) {
        try {
            await db.connect()
            const Novoproduto = 'insert into produtos (idfornecedor,nome,preco,idestoque,quantidade,idcategoria,lote,datavalidade) values ($1,$2,$3,$4,$5,$6,$7,$8)'
            await db.query(Novoproduto, [idfornecedor, nome, preco, idestoque, quantidade, idcategoria, lote, datavalidade])
            console.log('Inserção realizada com sucesso');
        } catch (error) {
            console.error('Erro ao inserir dados:', error);
        } finally {
            await db.end();
        }
    }
    return inserirdados;
}



