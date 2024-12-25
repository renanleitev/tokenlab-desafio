import { type FormEvent, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppThunkDispatch } from '../../store';

import { login } from '../../store/modules/users/reducer';
import { type User } from '../../types/User';
import SubmitButton from '../_UI/SubmitButton';
import BannerMessage from '../_UI/BannerMessage';
import { RootStateType } from '../../store/modules/rootReducer';

const LoginForm = () => {
  const isLoggedIn =
    useSelector<RootStateType, boolean>((state) => state.users.isLoggedIn) ||
    false;
  const errorMessage =
    useSelector<RootStateType, string>((state) => state.users.errorLogin) || '';
  const [user, setUser] = useState<User>({
    email: '',
    senha: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppThunkDispatch>();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/events');
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(login(user)).then(() => {
      if (errorMessage) {
        setShowBanner(true);
      } else {
        setShowBanner(false);
      }
    });
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          E-mail:
        </label>
        <input
          type="email"
          id="email"
          className="form-control"
          value={user.email}
          onChange={(e) => {
            setShowBanner(false);
            setUser({ ...user, email: e.target.value });
          }}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Senha:
        </label>
        <input
          type="password"
          id="password"
          className="form-control"
          value={user.senha}
          onChange={(e) => {
            setShowBanner(false);
            setUser({ ...user, senha: e.target.value });
          }}
          required
        />
      </div>

      <BannerMessage message={errorMessage} isBannerDisplayed={showBanner} />

      <SubmitButton isLoading={isLoading} buttonText="Entrar" />
    </form>
  );
};

export default LoginForm;
