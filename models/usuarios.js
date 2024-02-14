const {DataTypes,Model}= require("sequelize")
const sequelize=require('../config/cnx')

  
 const Usuarios=sequelize.define('Usuarios',{
    
     idusuario:{type:DataTypes.INTEGER},

     email:{type:DataTypes.STRING},
     cpf:{type:DataTypes.STRING},
     senha:{type:DataTypes.STRING},
     usuario:{type:DataTypes.STRING}
    
 })

 module.exports=Usuarios