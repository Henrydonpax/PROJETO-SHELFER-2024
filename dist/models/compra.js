"use strict";
const { DataTypes, Model } = require("sequelize");
const sequelize = require('../config/cnx');
const Compra = sequelize.define('Compra', {
    idcompra: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idfornecedor: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'fornecedores',
            key: 'idfornecedor'
        }
    },
    quantidade: { type: DataTypes.DATE },
    nome: { type: DataTypes.STRING },
    data_compra: { type: DataTypes.DATE }
});
module.exports = Compra;
