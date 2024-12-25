import { Router } from 'express';
import {
  inviteUser,
  getUserInvitations,
  respondToInvitation,
} from '../controllers/invitationController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

// Rota para criar um convite - somente usuários autenticados
router.post('/', authMiddleware, inviteUser);

// Rota para listar os convites de um usuário - somente usuários autenticados
router.get('/user/:id', authMiddleware, getUserInvitations);

// Rota para atualizar o status de um convite (aceitar ou rejeitar) - somente usuários autenticados
router.put('/:id', authMiddleware, respondToInvitation);

export default router;
