import { type FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { AppThunkDispatch } from '../../store';
import { register } from '../../store/modules/users/reducer';
import { type User } from '../../types/User';
import SubmitButton from '../_UI/SubmitButton';
import BannerMessage from '../_UI/BannerMessage';
import { RootStateType } from '../../store/modules/rootReducer';

const RegisterForm = () => {
  const isRegistered =
    useSelector<RootStateType, boolean>((state) => state.users.isRegistered) ||
    false;
  const errorMessage =
    useSelector<RootStateType, string>((state) => state.users.errorRegister) ||
    '';
  const [user, setUser] = useState<User>({
    email: '',
    senha: '',
    confirmarSenha: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppThunkDispatch>();

  useEffect(() => {
    if (isRegistered) {
      navigate('/events');
    }
  }, [isRegistered, navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(register(user)).finally(() => {
      if (errorMessage) {
        setShowBanner(true);
      } else {
        setShowBanner(false);
      }
      setIsLoading(false);
    });
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

      <div className="mb-3">
        <label htmlFor="confirmPassword" className="form-label">
          Confirmar Senha:
        </label>
        <input
          type="password"
          id="confirmPassword"
          className="form-control"
          value={user.confirmarSenha}
          onChange={(e) => {
            setShowBanner(false);
            setUser({ ...user, confirmarSenha: e.target.value });
          }}
          required
        />
      </div>

      <BannerMessage message={errorMessage} isBannerDisplayed={showBanner} />

      <SubmitButton
        isLoading={isLoading}
        buttonText="Cadastrar"
        buttonColor="btn-success"
      />
    </form>
  );
};

export default RegisterForm;
