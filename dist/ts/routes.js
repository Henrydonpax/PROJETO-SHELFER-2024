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
const express_1 = require("express");
const ApiErros_1 = require("./ApiErros");
const routes = (0, express_1.Router)();
routes.get('/', (_req, _res) => __awaiter(void 0, void 0, void 0, function* () {
    throw new ApiErros_1.ApiError('Error lançado no Api error', 400);
}));
exports.default = routes;
routes.use((_req, _res, _next) => {
    throw new ApiErros_1.BadRequestError('Page not found');
});
