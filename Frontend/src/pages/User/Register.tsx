import { Link } from 'react-router-dom';

import RegisterForm from '../../components/User/RegisterForm';

const Register = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title text-center">Cadastro</h2>
              <RegisterForm />
              <div className="text-center mt-3">
                <small>
                  Já possui uma conta? <Link to="/login">Faça login</Link>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
