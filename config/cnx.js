const Sequelize=require('sequelize')
const db=require('./config')

const sequelize=new Sequelize(db)

module.exports=sequelize