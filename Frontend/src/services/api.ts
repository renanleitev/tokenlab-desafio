import axios from 'axios';

import { type Event } from '../types/Event';
import { type InvitationStatus } from '../types/Invitation';
import { API_URL } from '../config/api';

// Funções para eventos
export const getEvents = async () => {
  const token = localStorage.getItem('token');
  return axios.get(`${API_URL}/events`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getUserEvents = async (userId: number) => {
  const token = localStorage.getItem('token');
  return axios.get(`${API_URL}/events/user/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getEvent = async (eventId: string) => {
  const token = localStorage.getItem('token');
  return axios.get(`${API_URL}/events/${eventId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getAcceptedEvents = async (userId: number) => {
  const token = localStorage.getItem('token');
  return axios.get(`${API_URL}/events/accepted-invitations/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createEvent = async (eventData: Event) => {
  const token = localStorage.getItem('token');
  return axios.post(`${API_URL}/events`, eventData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateEvent = async (eventId: number, eventData: Event) => {
  const token = localStorage.getItem('token');
  return axios.put(`${API_URL}/events/${eventId}`, eventData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteEvent = async (eventId: number) => {
  const token = localStorage.getItem('token');
  return axios.delete(`${API_URL}/events/${eventId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Funções para convites
export const getInvitations = async (userId: number) => {
  const token = localStorage.getItem('token');
  return axios.get(`${API_URL}/invitations/user/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const sendInvitation = async (userId: number, eventId: number) => {
  const token = localStorage.getItem('token');
  return axios.post(
    `${API_URL}/invitations`,
    { userId, eventId },
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
};

export const respondToInvitation = async (
  invitationId: number,
  invitationStatus: InvitationStatus,
) => {
  const token = localStorage.getItem('token');
  return axios.put(
    `${API_URL}/invitations/${invitationId}`,
    { status: invitationStatus, invitationId },
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
};

// Obtendo todos os usuários
export const getUsers = async () => {
  const token = localStorage.getItem('token');
  return axios.get(`${API_URL}/auth/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
