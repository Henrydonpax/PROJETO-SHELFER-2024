"use strict";
const { DataTypes, Model } = require("sequelize");
const sequelize = require('../config/cnx');
const Estoque = sequelize.define('Estoque', {
    idestoque: { type: DataTypes.INTEGER,
        primaryKey: true,
        toIncrement: true },
    descricao: { type: DataTypes.STRING }
});
module.exports = Estoque;
