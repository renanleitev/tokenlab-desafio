import { Link } from 'react-router-dom';

import LoginForm from '../../components/User/LoginForm';

const Login = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title text-center">Login</h2>
              <LoginForm />
              <div className="text-center mt-3">
                <small>
                  Não tem uma conta? <Link to="/register">Cadastre-se</Link>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
