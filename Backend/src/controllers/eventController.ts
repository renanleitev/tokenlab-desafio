import { Request, Response } from 'express';
import { Op } from 'sequelize';

import { Event } from '../models';
import { Invitation } from '../models';

export const createEvent = async (req: Request, res: Response) => {
  const { descricao, horaInicio, horaFim, userId } = req.body;

  try {
    // Verificando sobreposição de eventos
    const conflictingEvent = await Event.findOne({
      where: {
        userId,
        [Op.or]: [
          {
            horaInicio: {
              [Op.lt]: horaFim,
            },
            horaFim: {
              [Op.gt]: horaInicio,
            },
          },
        ],
      },
    });

    if (conflictingEvent) {
      res.status(400).json({
        message:
          'O evento não pode ser criado porque há um conflito com outro evento.',
        conflictingEvent,
      });
      return;
    }

    const event = await Event.create({
      descricao,
      horaInicio,
      horaFim,
      userId,
    });
    res.status(201).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar o evento.' });
  }
};

export const getEvents = async (req: Request, res: Response) => {
  const events = await Event.findAll();
  res.json(events);
};

export const getEventsByUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    // Buscando eventos pelo userId
    const events = await Event.findAll({
      where: {
        userId: id,
      },
    });

    if (events.length === 0) {
      res.status(200).json([]);
      return;
    }

    res.status(200).json(events);
  } catch (error) {
    console.error('Erro ao buscar eventos do usuário:', error);
  }
};

export const getEvent = async (req: Request, res: Response) => {
  const { id } = req.params;
  const event = await Event.findByPk(id);
  if (!event) {
    res.status(404).json({ message: 'Evento não encontrado' });
    return;
  }
  res.json(event);
};

export const getEventsWithAcceptedInvitations = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return;
    }

    // Busca eventos cujos convites foram aceitos pelo usuário
    const events = await Event.findAll({
      include: [
        {
          model: Invitation,
          as: 'invitations',
          where: {
            userId: id,
            status: 'accepted',
          },
          attributes: [], // Não retornar detalhes dos convites, apenas filtrar por eles
        },
      ],
      attributes: ['id', 'descricao', 'horaInicio', 'horaFim', 'userId'], // Detalhes do evento
    });

    res.status(200).json(events);
  } catch (error) {
    console.error('Erro ao obter eventos com convites aceitos:', error);
    res
      .status(500)
      .json({ message: 'Erro ao buscar eventos com convites aceitos.' });
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId, descricao, horaInicio, horaFim } = req.body;

  try {
    // Verificando se o evento existe
    const event = await Event.findByPk(id);
    if (!event) {
      res.status(404).json({ message: 'Evento não encontrado.' });
      return;
    }

    // Verificando sobreposição de eventos
    const conflictingEvent = await Event.findOne({
      where: {
        userId,
        id: { [Op.ne]: id }, // Ignorar o próprio evento durante a verificação
        [Op.or]: [
          {
            horaInicio: {
              [Op.lt]: horaFim,
            },
            horaFim: {
              [Op.gt]: horaInicio,
            },
          },
        ],
      },
    });

    if (conflictingEvent) {
      res.status(400).json({
        message:
          'O evento não pode ser atualizado porque há um conflito com outro evento.',
        conflictingEvent,
      });
      return;
    }

    // Atualizar o evento se não houver conflitos
    await event.update({
      descricao,
      horaInicio,
      horaFim,
    });

    res.status(200).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar o evento.' });
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await Event.destroy({
      where: {
        id,
      },
    });

    if (result === 0) {
      res.status(404).json({ message: 'Evento não encontrado' });
      return;
    } else {
      res.status(204).json({ message: 'Evento apagado com sucesso' });
    }
  } catch (error) {
    console.error('Erro ao tentar deletar o evento:', error);
  }
};
