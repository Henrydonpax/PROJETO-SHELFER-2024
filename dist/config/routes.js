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
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const insereproduto_1 = require("./insereproduto");
const insereusuario_1 = require("./insereusuario");
const conexao_1 = __importDefault(require("./conexao"));
const informacoesSistema_1 = __importDefault(require("./informacoesSistema"));
const passport_1 = __importDefault(require("passport"));
require("./auth");
const routes = express_1.default.Router();
routes.use(express_1.default.json());
routes.use(express_1.default.urlencoded({ extended: true }));
//Rota passport
routes.post('/login', passport_1.default.authenticate('local', {
    successRedirect: '/home',
}));
routes.get('/login', function (_req, res) {
    res.sendFile(path_1.default.join(__dirname + '../../../public/index2.html'));
});
routes.post('/home', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield conexao_1.default.connect();
        const informacoes = yield (0, informacoesSistema_1.default)();
        res.json({ success: true, informacoes });
    }
    catch (error) {
        console.error('Erro ao obter informações do sistema:', error);
        res.status(500).json({ success: false, message: 'Erro interno do servidor' });
    }
    finally {
        yield conexao_1.default.end();
    }
}));
routes.get('/home', function (_req, res) {
    res.sendFile(path_1.default.join(__dirname + '../../public/home2.html'));
});
routes.get('/cad-produtos', function (_req, res) {
    res.sendFile(path_1.default.join(__dirname + '../../public/cadastroprodutos2.html'));
});
routes.post('/cad-produtos', function (req, res) {
    (0, insereproduto_1.InsereProd)(req.body.idfornecedor, req.body.nome, req.body.preco, req.body.idestoque, req.body.quantidade, req.body.categoria, req.body.lote, req.body.datavalidade)
        .then(function () {
        res.send('Produto cadastrado com sucesso');
    })
        .catch(function (erro) {
        res.send('Não foi possível finalizar o cadastro' + erro);
    });
});
routes.get('/cad-usuarios', function (_req, res) {
    res.sendFile(path_1.default.join(__dirname + '../../public/cadastrousuarios.html'));
});
routes.post('/cad-usuarios', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield conexao_1.default.connect();
            yield (0, insereusuario_1.InsereUsu)(req.body.email, req.body.cpf, req.body.senha, req.body.nome);
            res.send('<script>alert("Usuário cadastrado com sucesso"); window.location="/cad-usuarios";</script>');
        }
        catch (erro) {
            console.error('Erro ao obter informações do sistema:', erro);
            res.send('Não foi possível finalizar o cadastro' + erro);
        }
        finally {
            yield conexao_1.default.end();
        }
    });
});
exports.default = routes;
