import { useNavigate } from 'react-router-dom';
import EventForm from '../../components/Event/EventForm';

const CreateEvent = () => {
  const navigate = useNavigate();

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
              <h2 className="card-title text-center">Criar Evento</h2>
              <EventForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
