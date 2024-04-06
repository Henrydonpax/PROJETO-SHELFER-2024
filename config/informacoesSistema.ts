import db from './conexao';


export default (obterInformacoesSistema:any) => {
  
 async function obterInformacoesSistema() {
 
  
  
  // Consultas SQL para obter informações do sistema
  const queryQuantidadeProdutos = 'SELECT COUNT(*) AS quantidade FROM produtos';
  const queryValorTotalItens = 'SELECT SUM(preco * quantidade) AS valor_total FROM produtos';
  const queryLucroBruto= 'SELECT SUM(valortotal) AS lucro_mensal FROM VENDA';

  const resultadoQuantidade = await db.query(queryQuantidadeProdutos);
  const resultadoValorTotal = await db.query(queryValorTotalItens);
  const resultadoLucroBruto = await db.query(queryLucroBruto);

  const informacoes = {
    quantidadeProdutos: resultadoQuantidade.rows[0].quantidade,
    valorTotalItens: resultadoValorTotal.rows[0].valor_total,
    lucroBruto:resultadoLucroBruto.rows[0].lucro_mensal,
  };

  
  return informacoes;
  
}
}

module.exports = {obterInformaçoesSistema};
