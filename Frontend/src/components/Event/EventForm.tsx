import { type FormEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { isAxiosError } from 'axios';

import { createEvent, updateEvent } from '../../services/api';
import { RootStateType } from '../../store/modules/rootReducer';
import formatDate from '../../utils/formatDate';
import { type Event } from '../../types/Event';
import { type User } from '../../types/User';
import SubmitButton from '../_UI/SubmitButton';
import BannerMessage from '../_UI/BannerMessage';

type EventFormProps = {
  event?: Event;
};

const EventForm = ({ event }: EventFormProps) => {
  const user =
    useSelector<RootStateType, User>((state) => state.users.user) || undefined;
  const isEditing = Boolean(event);
  const [eventData, setEventData] = useState<Event>({
    id: event?.id,
    descricao: event ? event.descricao : '',
    horaInicio: event ? event.horaInicio : '',
    horaFim: event ? event.horaFim : '',
    userId: event?.userId || user.id || 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { descricao, horaInicio, horaFim } = eventData;

    if (!descricao || !horaInicio || !horaFim) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    if (new Date(horaInicio) >= new Date(horaFim)) {
      setError('A hora de início deve ser anterior à hora de término.');
      return;
    }

    if (event && event.id) {
      // If editing an event
      try {
        setIsLoading(true);
        await updateEvent(event.id, eventData);
        navigate('/events');
      } catch (error) {
        if (isAxiosError(error)) {
          const errorMessage = error.response?.data?.message;
          setError(errorMessage);
        } else {
          setError('Erro ao atualizar o evento. Tente novamente.');
        }
        console.error('Erro ao atualizar o evento', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        // If creating a new event
        setIsLoading(true);
        await createEvent(eventData);
        navigate('/events');
      } catch (error) {
        if (isAxiosError(error)) {
          const errorMessage = error.response?.data?.message;
          setError(errorMessage);
        } else {
          setError('Erro ao criar o evento. Tente novamente.');
        }
        console.error('Erro ao criar o evento', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Descrição:
        </label>
        <input
          type="text"
          id="description"
          className="form-control"
          value={eventData.descricao}
          onChange={(e) => {
            setError('');
            setEventData({ ...eventData, descricao: e.target.value });
          }}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="startTime" className="form-label">
          Hora de Início:
        </label>
        <input
          type="datetime-local"
          id="startTime"
          className="form-control"
          value={formatDate(eventData.horaInicio.toLocaleString() ?? '')}
          onChange={(e) => {
            setError('');
            setEventData({ ...eventData, horaInicio: e.target.value });
          }}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="endTime" className="form-label">
          Hora de Término:
        </label>
        <input
          type="datetime-local"
          id="endTime"
          className="form-control"
          value={formatDate(eventData.horaFim.toLocaleString() ?? '')}
          onChange={(e) => {
            setError('');
            setEventData({ ...eventData, horaFim: e.target.value });
          }}
          required
        />
      </div>

      <BannerMessage message={error} />

      <SubmitButton
        isLoading={isLoading}
        buttonText={isEditing ? 'Editar Evento' : 'Criar Evento'}
      />
    </form>
  );
};

export default EventForm;
