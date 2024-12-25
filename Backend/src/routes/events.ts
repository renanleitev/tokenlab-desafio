import { Router } from 'express';
import {
  createEvent,
  getEvent,
  getEvents,
  getEventsByUser,
  getEventsWithAcceptedInvitations,
  updateEvent,
  deleteEvent,
} from '../controllers/eventController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/', authMiddleware, createEvent); // Criação de evento
router.get('/', authMiddleware, getEvents); // Listagem de eventos
router.get('/user/:id', authMiddleware, getEventsByUser); // Listagem de eventos por usuário
router.get('/accepted-invitations/:id', authMiddleware, getEventsWithAcceptedInvitations); // Listagem de eventos cujos convites foram aceitos
router.get('/:id', getEvent); // Evento por ID
router.put('/:id', authMiddleware, updateEvent); // Atualização de evento
router.delete('/:id', authMiddleware, deleteEvent); // Exclusão de evento

export default router;
