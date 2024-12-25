import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getEvents, getUsers } from '../../services/api';
import InvitationForm from '../../components/Invitation/InvitationForm';
import LoadingScreen from '../../components/_UI/LoadingScreen';
import ErrorScreen from '../../components/_UI/ErrorScreen';

const CreateInvitation = () => {
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        const response = await getEvents();
        setEvents(response.data);
      } catch (error) {
        setIsError(true);
        console.error('Erro ao obter a lista de eventos', error);
      } finally {
        setIsLoading(false);
      }
    };
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await getUsers();
        setUsers(response.data);
      } catch (error) {
        setIsError(true);
        console.error('Erro ao obter a lista de usuários', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEvents();
    fetchUsers();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    return <ErrorScreen message="Erro ao obter a lista de eventos" />;
  }

  return (
    <div className="container mt-5">
      <button
        type="button"
        className="btn btn-primary mb-3"
        onClick={() => navigate('/events')}
      >
        Ver Eventos
      </button>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title text-center">Enviar Convite</h2>
              <InvitationForm events={events} users={users} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateInvitation;