import { Event } from "./Event";

export type InvitationStatus = 'accepted' | 'rejected' | 'pending';

export type Invitation = {
  id: number;
  eventId: number; // ID do evento
  userId: number; // ID do usuário convidado
  status: InvitationStatus; // Status do convite: 'pending', 'accepted', 'rejected'
  event?: Event;
};
