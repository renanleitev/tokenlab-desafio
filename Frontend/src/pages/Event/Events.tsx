import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RootStateType } from '../../store/modules/rootReducer';
import { getAcceptedEvents, getUserEvents } from '../../services/api';
import EventList from '../../components/Event/EventList';
import LoadingScreen from '../../components/_UI/LoadingScreen';
import ErrorScreen from '../../components/_UI/ErrorScreen';
import { type Event } from '../../types/Event';
import { type User } from '../../types/User';

const Events = () => {
  const user =
    useSelector<RootStateType, User>((state) => state.users.user) || undefined;
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Obtendo todos os eventos (criados ou aceitos pelo usuário)
        if (user.id) {
          setIsLoading(true);
          // Obtendo eventos criados pelo usuário (host)
          const responseEventsCreatedByUser = await getUserEvents(user.id);
          const eventsCreatedByUser = responseEventsCreatedByUser.data;
          // Obtendo eventos aceitos pelo usuário (guest)
          const responseEventsAcceptedByUser = await getAcceptedEvents(user.id);
          const eventsAcceptedByUser = responseEventsAcceptedByUser.data;
          // Agrupando os eventos
          setEvents([ ...eventsCreatedByUser, ...eventsAcceptedByUser ]);
        }
      } catch (error) {
        setIsError(true);
        console.error('Erro ao obter a lista de eventos', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEvents();
  }, [user?.id]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    return <ErrorScreen message="Erro ao obter a lista de eventos" />;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Lista de Eventos</h2>
      <div className="d-flex flex-row-reverse mb-3">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => navigate('/event/new')}
        >
          Criar Evento
        </button>
      </div>
      <EventList events={events} />
    </div>
  );
};

export default Events;
