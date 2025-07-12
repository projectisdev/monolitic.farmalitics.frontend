import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth/useAuth'; // Ajusta la ruta según la ubicación real del hook

interface PublicOnlyRouteProps {
  children: ReactNode;
}

export const PublicOnlyRoute = ({ children }: PublicOnlyRouteProps) => {
  const { isAuthenticated } = useAuth(); // Este hook debe retornar el estado de login

  if (isAuthenticated) {
    return <Navigate to="/" />; // O la ruta que tú prefieras si está logueado
  }

  return <>{children}</>;
};