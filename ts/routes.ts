import { Router } from "express";
import { ApiError, BadRequestError } from "./ApiErros";

const routes = Router();

routes.get('/', async (_req, _res) => {
    throw new ApiError('Error lançado no Api error', 400);
});

export default routes;

routes.use((_req, _res, _next) => {
    
    throw new BadRequestError('Page not found');
});
