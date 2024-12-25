import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { RootStateType } from '../../store/modules/rootReducer';
import { AppThunkDispatch } from '../../store';
import { logoutUser } from '../../store/modules/users/reducer';
import { type User } from '../../types/User';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const user =
    useSelector<RootStateType, User>((state) => state?.users?.user) ||
    undefined;

  const isLoggedIn =
    useSelector<RootStateType, boolean>((state) => state?.users?.isLoggedIn) ||
    false;

  const navigate = useNavigate();
  const dispatch = useDispatch<AppThunkDispatch>();

  const handleAuth = () => {
    if (isLoggedIn) {
      dispatch(logoutUser());
    }
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const NavItems = () => {
    return (
      <>
        {isLoggedIn && (
          <>
            <li className="nav-item p-2 link-primary">
              <Link className="nav-link" to="/events">
                Eventos
              </Link>
            </li>
            <li className="nav-item p-2 link-primary">
              <Link className="nav-link" to="/invitations">
                Convites
              </Link>
            </li>
          </>
        )}
        <li className="nav-item p-2 link-primary" onClick={() => handleAuth()}>
          <Link className="nav-link" to="/login">
            {isLoggedIn ? 'Logout' : 'Login'}
          </Link>
        </li>
        {!isLoggedIn && (
          <li className="nav-item p-2 link-primary">
            <Link className="nav-link" to="/register">
              Cadastro
            </Link>
          </li>
        )}
      </>
    );
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <div className='w-50'>
          {isLoggedIn ? (
            <h6 className="text-white">
              Bem-vindo, {user.email}!
            </h6>
          ) : (
            <h6 className="text-white">Desafio Tokenlab</h6>
          )}
        </div>

        {/* Botão responsivo */}
        <button
          className="navbar-toggler"
          id="navbarDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded={isOpen ? 'true' : 'false'}
          onClick={toggleMenu}
        >
          <span className="navbar-toggler-icon"></span>
          <ul
            className={`dropdown-menu  ${isOpen ? 'show' : ''}`}
            style={{ right: '1rem' }}
            aria-labelledby="navbarDropdown"
          >
            <NavItems />
          </ul>
        </button>

        {/* Links de navegação */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <NavItems />
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
