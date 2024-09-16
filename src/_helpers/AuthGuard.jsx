import { Navigate } from 'react-router-dom';
import accountServices from '../_services/account.service';

function AuthGuard({ children }) {
  if (!accountServices.isLogged()) {
    return <Navigate to="/" />;
  }

  return children;
}

export default AuthGuard;
