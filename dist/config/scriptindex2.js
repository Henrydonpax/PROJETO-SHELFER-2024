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
function realizarLogin() {
    return __awaiter(this, void 0, void 0, function* () {
        const email = document.getElementById('login').value;
        const senha = document.getElementById('password').value;
        try {
            const response = yield axios.post('http://localhost:3000/login', {
                email: login,
                senha: senha
            });
            console.log(response.data.message);
            alert(response.data.message);
        }
        catch (error) {
            console.error('Erro ao realizar login:', error.response.data.message);
            alert('Credenciais inválidas.');
        }
    });
}
