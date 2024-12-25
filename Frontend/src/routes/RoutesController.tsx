import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RootStateType } from '../store/modules/rootReducer';

import Login from '../pages/User/Login';
import Register from '../pages/User/Register';
import Events from '../pages/Event/Events';
import CreateEvent from '../pages/Event/CreateEvent';
import EditEvent from '../pages/Event/EditEvent';
import Invitations from '../pages/Invitation/Invitations';
import CreateInvitation from '../pages/Invitation/CreateInvitation';

const RoutesController = () => {
  const isLoggedIn =
    useSelector<RootStateType, boolean>((state) => state?.users?.isLoggedIn) ||
    false;

  return (
    <Routes>
      <Route path="/" element={isLoggedIn ? <Events /> : <Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/events" element={<Events />} />
      <Route path="/event/new" element={<CreateEvent />} />
      <Route path="/event/edit/:id" element={<EditEvent />} />
      <Route path="/invitations" element={<Invitations />} />
      <Route path="/invitations/new" element={<CreateInvitation />} />
    </Routes>
  );
};

export default RoutesController;
