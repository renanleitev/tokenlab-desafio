import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { RootStateType } from '../../store/modules/rootReducer';
import { getInvitations } from '../../services/api';
import InvitationList from '../../components/Invitation/InvitationList';
import LoadingScreen from '../../components/_UI/LoadingScreen';
import ErrorScreen from '../../components/_UI/ErrorScreen';
import { type Invitation } from '../../types/Invitation';
import { type User } from '../../types/User';

const Invitations = () => {
  const user =
    useSelector<RootStateType, User>((state) => state.users.user) || undefined;

  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setisError] = useState(false);
  const [isFetchingInvitations, setIsFetchingInvitations] = useState(false);

  useEffect(() => {
    const fetchInvitations = async () => {
      try {
        setIsLoading(true);
        const response = await getInvitations(user.id ?? 0);
        setInvitations(response.data);
      } catch (error) {
        setisError(true);
        console.error('Erro ao obter a lista de convites', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchInvitations();
  }, [user, isFetchingInvitations]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    return <ErrorScreen message="Erro ao obter a lista de convites" />;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Lista de Convites</h2>
      <InvitationList
        invitations={invitations}
        onFetchInvitations={setIsFetchingInvitations}
      />
    </div>
  );
};

export default Invitations;
