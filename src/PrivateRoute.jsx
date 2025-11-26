import { Navigate } from 'react-router-dom';
import { useAuthenticated } from './context/AuthenticatedContext';

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuthenticated();
  return isAuthenticated ? children : backpage();
}
export default PrivateRoute;

function backpage() {
  console.log('backpage');
  return <Navigate to='/login' />;
}
