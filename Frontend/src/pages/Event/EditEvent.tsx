import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import EventForm from '../../components/Event/EventForm';
import LoadingScreen from '../../components/_UI/LoadingScreen';
import ErrorScreen from '../../components/_UI/ErrorScreen';
import { getEvent } from '../../services/api';
import { type Event } from '../../types/Event';

const EditEvent = () => {
  const [event, setEvent] = useState<Event>();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setisError] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        if (!id) {
          return;
        }
        setIsLoading(true);
        const response = await getEvent(id);
        const eventData = response.data;
        setEvent(eventData);
      } catch (error) {
        setisError(true);
        console.error('Não foi possível obter o evento', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    return <ErrorScreen message="Erro ao obter dados do evento" />;
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title text-center">Editar Evento</h2>
              <EventForm event={event} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEvent;
