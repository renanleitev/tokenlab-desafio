import { Request, Response } from 'express';
import Invitation from '../models/Invitation';
import { Event } from '../models';
import User from '../models/User';

// Enviar um convite para um usuário para participar de um evento
export const inviteUser = async (req: Request, res: Response) => {
  const { eventId, userId } = req.body;

  // Verificar se o evento existe
  const event = await Event.findByPk(eventId);
  if (!event) {
    res.status(404).json({ message: 'Evento não encontrado' });
    return;
  }

  // Verificar se o usuário que está sendo convidado existe
  const user = await User.findByPk(userId);
  if (!user) {
    res.status(404).json({ message: 'Usuário não encontrado' });
    return;
  }

  // Criar o convite
  const invitation = await Invitation.create({
    eventId,
    userId,
    status: 'pending', // Status inicial do convite é 'pending'
  });

  res.status(201).json({ message: 'Convite enviado com sucesso', invitation });
};

// Obter todos os convites de um usuário
export const getUserInvitations = async (req: Request, res: Response) => {
  const { id } = req.params;

  // Verificando se o usuário existe
  const user = await User.findByPk(id);
  if (!user) {
    res.json([]);
    return;
  }

  // Buscando os convites do usuário
  const invitations = await Invitation.findAll({
    where: { userId: id },
    include: [{ model: Event, as: 'event' }],
  });

  res.json(invitations);
};

// Responder ao convite (RSVP)
export const respondToInvitation = async (req: Request, res: Response) => {
  const { invitationId, eventId, guestId, status } = req.body;

  // Verificar se o status é válido
  if (!['accepted', 'rejected'].includes(status)) {
    res
      .status(400)
      .json({ message: 'Status inválido. Deve ser "accepted" ou "rejected".' });
    return;
  }

  // Encontrar o convite
  const invitation = await Invitation.findByPk(invitationId);
  if (!invitation) {
    res.status(404).json({ message: 'Convite não encontrado' });
    return;
  }

  // Atualizar o status do convite
  invitation.status = status;
  await invitation.save();

  res.json({ message: `Convite ${status}`, invitation });
};
