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
function segunda() {
    console.log("Segunda execução");
}
console.log("primeira execuçao");
segunda();
const comPromise = new Promise((resolve, reject) => {
    let resultado = 2 * 1;
    if (resultado == 4) {
        resolve("sucesso da promise");
    }
    else {
        reject("Promise falhou");
    }
});
console.log(comPromise);
function metodo() {
    return new Promise((resolve) => );
    {
        setTimeout(() => {
            console.log("Aguardou");
            resolve();
        }, 3000);
    }
}
function testeAsync() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Iniciou");
        yield metodo().then(() => {
            console.log('Sucesso na trasaçao');
        }).catch((erro) => {
            console.log('Nao deu certo' + erro);
        });
        console.log("terminou");
    });
}
testeAsync();
