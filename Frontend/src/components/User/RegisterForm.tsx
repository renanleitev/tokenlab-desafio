import { type FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAxiosError } from 'axios';
import { useDispatch } from 'react-redux';

import { AppThunkDispatch } from '../../store';
import { register } from '../../store/modules/users/reducer';
import { type User } from '../../types/User';
import SubmitButton from '../_UI/SubmitButton';
import BannerMessage from '../_UI/BannerMessage';

type RegisterUser = User & {
  confirmarSenha: string;
};

const RegisterForm = () => {
  const [user, setUser] = useState<RegisterUser>({
    email: '',
    senha: '',
    confirmarSenha: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch<AppThunkDispatch>();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { email, senha, confirmarSenha } = user;

    // Validação dos campos (email, senha e confirmar senha)
    if (!email || !senha || !confirmarSenha) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    if (senha !== confirmarSenha) {
      setError('As senhas não coincidem.');
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      dispatch(register(user));
      navigate('/login'); // Redireciona para a página de login após o cadastro
    } catch (error) {
      if (isAxiosError(error)) {
        const errorMessage = error.response?.data?.message;
        setError(errorMessage);
      } else {
        setError('Erro ao criar a conta. Tente novamente.');
      }
      console.error('Erro ao criar a conta', error);
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
            setError('');
            setUser({ ...user, confirmarSenha: e.target.value });
          }}
          required
        />
      </div>

      <BannerMessage message={error} />

      <SubmitButton
        isLoading={isLoading}
        buttonText="Cadastrar"
        buttonColor="btn-success"
      />
    </form>
  );
};

export default RegisterForm;
