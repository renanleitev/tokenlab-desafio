import { Link } from "react-router-dom";

type ErrorScreenProps = {
  message?: string;
};

const ErrorScreen = ({
  message = 'Ocorreu um erro inesperado.',
}: ErrorScreenProps) => {
  return (
    <div className="d-flex justify-content-center align-items-center pt-5 mt-5">
      <div className="text-center">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Erro!</h4>
          <p>{message}</p>
        </div>
        <p className="mt-3">
          <Link to="/">
            Voltar para a Página Inicial
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ErrorScreen;
