import { type FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppThunkDispatch } from '../../store';

import { login } from '../../store/modules/users/reducer';
import { type User } from '../../types/User';
import SubmitButton from '../_UI/SubmitButton';
import BannerMessage from '../_UI/BannerMessage';

const LoginForm = () => {
  const [user, setUser] = useState<User>({
    email: '',
    senha: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch<AppThunkDispatch>();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { email, senha } = user;

    if (!email || !senha) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      dispatch(login(user));
      navigate('/events');
    } catch (error) {
      setError('Erro ao fazer login. Tente novamente.');
      console.error('Erro ao fazer login', error);
    } finally {
      setIsLoading(false);
    }
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
            setError('');
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
            setError('');
            setUser({ ...user, senha: e.target.value });
          }}
          required
        />
      </div>

      <BannerMessage message={error} />

      <SubmitButton isLoading={isLoading} buttonText="Entrar" />
    </form>
  );
};

export default LoginForm;
