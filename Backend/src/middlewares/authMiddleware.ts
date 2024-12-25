import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { verifyToken } from '../utils/jwt';

const JWT_SECRET = process.env.JWT_SECRET || 'secret_key';

interface AuthenticatedRequest extends Request {
  userId?: number; // Armazena o ID do usuário autenticado após a validação do token
}

// Middleware para verificar se o usuário está autenticado
export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  // Pegar o token do cabeçalho Authorization
  const token = req.header('Authorization')?.replace('Bearer ', '');

  // Se não houver token, retornar erro
  if (!token) {
    res
      .status(401)
      .json({ message: 'Acesso não autorizado. Token não encontrado.' });
    return;
  }

  try {
    // Verificar o token com a chave secreta
    const decoded = verifyToken(token);

    // Adicionar o userId ao request para ser utilizado nas rotas
    req.userId = decoded.userId;

    // Seguir para a próxima função/middleware
    next();
  } catch (err) {
    res.status(401).json({ message: 'Acesso não autorizado. Token inválido.' });
  }
};
