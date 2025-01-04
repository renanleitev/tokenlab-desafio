import { useState } from 'react';
import { isAxiosError } from 'axios';

import { respondToInvitation } from '../../services/api';
import { type Invitation, type InvitationStatus } from '../../types/Invitation';
import BannerMessage from '../_UI/BannerMessage';

type InvitationListProps = {
  invitations: Invitation[];
  onFetchInvitations: (value: boolean) => void;
};

const InvitationList = ({
  invitations,
  onFetchInvitations,
}: InvitationListProps) => {
  const [error, setError] = useState('');

  const handleResponse = async (
    invitationId: number,
    response: InvitationStatus,
  ) => {
    try {
      onFetchInvitations(true);
      await respondToInvitation(invitationId, response);
    } catch (error) {
      if (isAxiosError(error)) {
        const errorMessage = error.response?.data?.message;
        setError(errorMessage);
      } else {
        setError('Erro ao atualizar o evento. Tente novamente.');
      }
      console.error('Erro ao responder convite', error);
    } finally {
      onFetchInvitations(false);
    }
  };

  const getStatus = (status: InvitationStatus) => {
    switch (status) {
      case 'accepted':
        return {
          title: 'Aceito',
          color: 'bg-success',
        };
      case 'rejected':
        return {
          title: 'Recusado',
          color: 'bg-danger',
        };
      case 'pending':
      default:
        return {
          title: 'Pendente',
          color: 'bg-warning',
        };
    }
  };

  return (
    <div className="table-responsive">
      <BannerMessage message={error} isBannerDisplayed={Boolean(error)} />
      <table className="table table-bordered table-hover">
        <thead className="table-primary">
          <tr>
            <th>#</th>
            <th>Evento</th>
            <th>Início</th>
            <th>Término</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {invitations.map((invitation, index) => (
            <tr key={invitation.id}>
              <td>{index + 1}</td>
              {invitation.event && (
                <>
                  <td>{invitation.event.descricao}</td>
                  <td>
                    {new Date(invitation.event.horaInicio).toLocaleString()}
                  </td>
                  <td>{new Date(invitation.event.horaFim).toLocaleString()}</td>
                </>
              )}
              <td>
                <span className={`badge ${getStatus(invitation.status).color}`}>
                  {getStatus(invitation.status).title}
                </span>
              </td>
              <td>
                {invitation.status === 'pending' ? (
                  <div className="d-flex gap-2 justify-content-center">
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => handleResponse(invitation.id, 'accepted')}
                    >
                      Aceitar
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleResponse(invitation.id, 'rejected')}
                    >
                      Recusar
                    </button>
                  </div>
                ) : (
                  <div className="d-flex justify-content-center">
                    <span className="badge bg-secondary">Ação concluída</span>
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

export default InvitationList;
