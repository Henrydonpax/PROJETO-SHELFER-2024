"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const db = new pg_1.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'bancosistema',
    password: 'postgres',
    port: 5432,
});
exports.default = db;
