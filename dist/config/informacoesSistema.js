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
const conexao_1 = __importDefault(require("./conexao"));
exports.default = () => __awaiter(void 0, void 0, void 0, function* () {
    function obterInformacoesSistema() {
        return __awaiter(this, void 0, void 0, function* () {
            // Consultas SQL para obter informações do sistema
            const queryQuantidadeProdutos = 'SELECT COUNT(*) AS quantidade FROM produtos';
            const queryValorTotalItens = 'SELECT SUM(preco * quantidade) AS valor_total FROM produtos';
            const queryLucroBruto = 'SELECT SUM(valortotal) AS lucro_mensal FROM VENDA';
            const resultadoQuantidade = yield conexao_1.default.query(queryQuantidadeProdutos);
            const resultadoValorTotal = yield conexao_1.default.query(queryValorTotalItens);
            const resultadoLucroBruto = yield conexao_1.default.query(queryLucroBruto);
            const informacoes = {
                quantidadeProdutos: resultadoQuantidade.rows[0].quantidade,
                valorTotalItens: resultadoValorTotal.rows[0].valor_total,
                lucroBruto: resultadoLucroBruto.rows[0].lucro_mensal,
            };
            return informacoes;
        });
    }
    return obterInformacoesSistema;
});
