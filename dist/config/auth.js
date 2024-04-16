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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_local_1 = require("passport-local");
const passport_1 = __importDefault(require("passport"));
const conexao_1 = __importDefault(require("./conexao"));
passport_1.default.use(new passport_local_1.Strategy({
    usernameField: 'email',
    passwordField: 'senha'
}, function (email, senha, done) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield conexao_1.default.connect();
            const result = yield conexao_1.default.query('SELECT * FROM usuarios WHERE email = $1 AND senha = $2', [email, senha]);
            if (result.rows.length === 0) {
                return done(null, false, { message: 'Credenciais inválidas' });
            }
            return done(null, result.rows[0]);
        }
        catch (error) {
            console.error('Erro ao consultar o banco de dados:', error);
            return done(error);
        }
        finally {
            yield conexao_1.default.end();
        }
    });
}));
passport_1.default.serializeUser((user, done) => {
    done(null, user.email);
});
passport_1.default.deserializeUser((email, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield conexao_1.default.connect();
        const result = yield conexao_1.default.query('SELECT * FROM usuarios WHERE email = $1', [email]);
        if (result.rows.length === 0) {
            return done(new Error('Usuário não encontrado'));
        }
        return done(null, result.rows[0]);
    }
    catch (error) {
        console.error('Erro ao consultar o banco de dados:', error);
        return done(error);
    }
    finally {
        yield conexao_1.default.end();
    }
}));
exports.default = passport_1.default;
