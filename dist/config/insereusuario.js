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
exports.InsereUsu = void 0;
const conexao_1 = __importDefault(require("./conexao"));
function InsereUsu(email, cpf, senha, nome) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield conexao_1.default.connect();
            const Novousuario = 'insert into usuarios(email,cpf,senha,nome) values ($1,$2,$3,$4)';
            yield conexao_1.default.query(Novousuario, [email, cpf, senha, nome]);
        }
        catch (error) {
            console.error('Erro ao inserir dados:', error);
        }
        finally {
            yield conexao_1.default.end();
        }
    });
}
exports.InsereUsu = InsereUsu;
