// src/components/PrivateRoute.jsx
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');

  // Se não estiver logado, redirecionar para login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Se estiver logado, renderizar o componente
  return children;
}

export default PrivateRoute;