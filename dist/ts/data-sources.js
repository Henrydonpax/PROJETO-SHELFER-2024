"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("reflect/metadata");
const pg_1 = require("pg");
class DataSource {
    constructor() {
        this.pool = new pg_1.Pool({
            user: 'postgres',
            host: 'localhost',
            database: 'bancosistema',
            password: 'postgres',
            port: 5432,
        });
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.pool.connect();
                console.log('Conexão com o banco de dados estabelecida');
            }
            catch (error) {
                console.error('Erro ao conectar ao banco de dados:', error);
            }
        });
    }
    query(sql, params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.pool.query(sql, params);
                return result;
            }
            catch (error) {
                console.error('Erro ao executar consulta SQL:', error);
                throw error;
            }
        });
    }
    end() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.pool.end();
                console.log('Conexão com o banco de dados encerrada');
            }
            catch (error) {
                console.error('Erro ao encerrar conexão com o banco de dados:', error);
            }
        });
    }
}
exports.default = new DataSource();
