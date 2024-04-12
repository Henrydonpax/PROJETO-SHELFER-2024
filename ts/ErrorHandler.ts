import { Request, Response, NextFunction } from 'express';

function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  console.error('Erro na API:', err);
  res.status(500).json({ error: 'Erro interno do servidor' });
}

export default errorHandler;
