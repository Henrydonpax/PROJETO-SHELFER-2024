"use strict";
const { DataTypes, Model } = require("sequelize");
const sequelize = require('../config/cnx');
const Categorias = sequelize.define('Categorias', {
    idcategoria: { type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true },
    nome: { type: DataTypes.STRING },
    descricao: { type: DataTypes.STRING, }
});
module.exports = Categorias;
