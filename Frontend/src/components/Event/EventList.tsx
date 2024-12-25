import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isAxiosError } from 'axios';

import { type Event } from '../../types/Event';
import { deleteEvent } from '../../services/api';
import BannerMessage from '../_UI/BannerMessage';
import { RootStateType } from '../../store/modules/rootReducer';
import { type User } from '../../types/User';

type EventListProps = {
  events: Event[];
};

const EventList = ({ events }: EventListProps) => {
  const user =
    useSelector<RootStateType, User>((state) => state?.users?.user) ||
    undefined;

  const [message, setMessage] = useState('');
  const [isDeleted, setIsDeleted] = useState(false);

  const navigate = useNavigate();

  const onDeleteEvent = async (eventId?: number) => {
    if (!eventId) {
      return;
    }
    try {
      await deleteEvent(eventId);
      setMessage('Evento apagado com sucesso!');
      setIsDeleted(true);
      window.location.reload();
    } catch (error) {
      if (isAxiosError(error)) {
        const errorMessage = error.response?.data?.message;
        setMessage(errorMessage);
      } else {
        setMessage('Erro ao apagar o evento. Tente novamente.');
      }
      console.error('Erro ao apagar evento', error);
    }
  };

  return (
    <div className="table-responsive">
      <BannerMessage
        message={message}
        intent={isDeleted ? 'SUCCESS' : 'ERROR'}
        isBannerDisplayed={Boolean(message)}
      />
      <table className="table table-bordered table-hover">
        <thead className="table-primary">
          <tr>
            <th>#</th>
            <th>Descrição</th>
            <th>Início</th>
            <th>Término</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => (
            <tr key={event.id}>
              <td>{index + 1}</td>
              <td>{event.descricao}</td>
              <td>{new Date(event.horaInicio).toLocaleString()}</td>
              <td>{new Date(event.horaFim).toLocaleString()}</td>
              <td>
                {event.userId !== user.id ? (
                  <div className="d-flex justify-content-center">
                    <span className="badge bg-success">Convite aceito</span>
                  </div>
                ) : (
                  <div className="d-flex justify-content-center">
                    <div className="d-flex flex-column gap-2">
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() => navigate(`/event/edit/${event.id}`)}
                        >
                          Editar
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => onDeleteEvent(event.id)}
                        >
                          Excluir
                        </button>
                      </div>
                      <button
                        className="btn btn-success btn-sm w-100"
                        onClick={() => navigate(`/invitations/new`)}
                      >
                        Criar convite
                      </button>
                    </div>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventList;
