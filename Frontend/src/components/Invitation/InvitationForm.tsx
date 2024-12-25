import { type FormEvent, type ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isAxiosError } from 'axios';

import { sendInvitation } from '../../services/api';
import { type Invitation } from '../../types/Invitation';
import { type User } from '../../types/User';
import { type Event } from '../../types/Event';
import SubmitButton from '../_UI/SubmitButton';
import BannerMessage from '../_UI/BannerMessage';
import { RootStateType } from '../../store/modules/rootReducer';

type InvitationFormProps = {
  events: Event[];
  users: User[];
};

const InvitationForm = ({ events, users }: InvitationFormProps) => {
  const user =
    useSelector<RootStateType, User>((state) => state.users.user) || undefined;

  const [invitationData, setInvitationData] = useState<Partial<Invitation>>({
    id: 0,
    eventId: 0,
    userId: 0,
    status: 'pending',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleChangeUser = (event: ChangeEvent<HTMLSelectElement>) => {
    setInvitationData({
      ...invitationData,
      userId: Number.parseInt(event.target.value),
    });
  };

  const handleChangeEvent = (event: ChangeEvent<HTMLSelectElement>) => {
    setInvitationData({
      ...invitationData,
      eventId: Number.parseInt(event.target.value),
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { eventId, userId } = invitationData;

    if (!eventId || !userId) {
      setError('Por favor, selecione os campos necessários.');
      return;
    }

    if (userId === user.id) {
      setError(
        'Não é possível enviar o convite pois você já faz parte do evento',
      );
      return;
    }

    try {
      setIsLoading(true);
      await sendInvitation(userId, eventId);
      navigate('/events');
    } catch (error) {
      if (isAxiosError(error)) {
        const errorMessage = error.response?.data?.message;
        setError(errorMessage);
      } else {
        setError('Erro ao criar o convite. Tente novamente.');
      }
      console.error('Erro ao criar o convite', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="mb-3">
        <label htmlFor="events" className="form-label">
          Evento:
        </label>
        <select
          className="form-select"
          name="events"
          onChange={handleChangeEvent}
        >
          <option value={''}>---</option>
          {events.map((event) => {
            return <option value={event.id}>{event.descricao}</option>;
          })}
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="users" className="form-label">
          Usuário:
        </label>
        <select
          className="form-select"
          name="users"
          onChange={handleChangeUser}
        >
          <option value={''}>---</option>
          {users.map((user) => {
            return <option value={user.id}>{user.email}</option>;
          })}
        </select>
      </div>

      <BannerMessage message={error} />

      <SubmitButton isLoading={isLoading} buttonText="Enviar Convite" />
    </form>
  );
};

export default InvitationForm;
