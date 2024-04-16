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
exports.InsereProd = void 0;
const conexao_1 = __importDefault(require("./conexao"));
////////se o tipo de algum parametro for number ele não funciona////////////
function InsereProd(idfornecedor, nome, preco, idestoque, quantidade, idcategoria, lote, datavalidade) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield conexao_1.default.connect();
            const Novoproduto = 'insert into produtos (idfornecedor,nome,preco,idestoque,quantidade,idcategoria,lote,datavalidade) values ($1,$2,$3,$4,$5,$6,$7,$8)';
            yield conexao_1.default.query(Novoproduto, [idfornecedor, nome, preco, idestoque, quantidade, idcategoria, lote, datavalidade]);
            console.log('Inserção realizada com sucesso');
        }
        catch (error) {
            console.error('Erro ao inserir dados:', error);
        }
        finally {
            yield conexao_1.default.end();
        }
    });
}
exports.InsereProd = InsereProd;
