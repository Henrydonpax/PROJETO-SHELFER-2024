const {DataTypes,Model, Sequelize}= require("sequelize")
const sequelize=require('../config/cnx')


const Produtos=sequelize.define('Produtos',{
    
    idproduto:{
    type:DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,},

    idfornecedor:{
        type:Sequelize.INTEGER,
        allowNull:false,
        references:{
            model:'fornecedores',
            key:'idfornecedor'}},
   
    nome:{type:DataTypes.STRING},

    preco:{type:DataTypes.NUMBER},

    idestoque:{
     type:Sequelize.INTEGER,
     allowNull:false,
     references:{
        model:'Estoque',
        key:'idestoque'
     }},

    quantidade:{type:DataTypes.INTEGER},

    idcategoria:{
        type:Sequelize.INTEGER,
        allowNull:false,
        references:{
            model:'categorias',
            key:'idcategoria'
        }},

    lote:{type:DataTypes.INTEGER},

    datavalidade:{type:DataTypes.DATE},

    })

module.exports=Produtos