const {DataTypes,Model}= require("sequelize")
const sequelize=require('../config/cnx')

const Supermercado=sequelize.define('Supermercado',{
   
    idfilial:{type:DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,},

    cnpj:{type:DataTypes.STRING},
    endereco:{type:DataTypes.STRING}

    })

modeule.exports=Supermercado