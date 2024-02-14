const {DataTypes,Model, Sequelize}= require("sequelize")
const sequelize=require('../config/cnx')


 const Venda=sequelize.define('Venda',{

     idvenda:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        toIncrement: true,},

     idproduto:{type:Sequelize.INTEGER,
         allowNull:false  },

     quantidade:{type:DataTypes.INTEGER},

     valortotal:{type:DataTypes.NUMBER},

     valorunidade:{type:DataTypes.NUMBER},
 
     datavenda:{type:DataTypes.DATE}
      })

module.exports=Venda;  