"use strict";
const { DataTypes, Model } = require("sequelize");
const sequelize = require('../config/cnx');
const Fornecedores = sequelize.define('Fornecedores', {
    idfornecedor: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        toIncrement: true
    },
    nome: { type: DataTypes.STRING },
    endereco: { type: DataTypes.STRING },
    telefone: { type: DataTypes.STRING }
});
