"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("WORKING WELL");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const routes_1 = __importDefault(require("./config/routes"));
const port = 8080;
const passport_1 = __importDefault(require("passport"));
const LocalStrategy = require('passport-local').Strategy;
const express_session_1 = __importDefault(require("express-session"));
app.use((0, express_session_1.default)({
    secret: 'segredo',
    resave: false,
    saveUninitialized: false
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// arquivos estáticos
app.use(express_1.default.static(__dirname + '/public'));
app.use(express_1.default.static(__dirname + '/imgs'));
app.use(routes_1.default);
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
