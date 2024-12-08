import React from 'react';
import { Navigate } from 'react-router-dom';
import { isTokenValid } from './Token';
import { jwtDecode } from 'jwt-decode';

interface ProtectedRouteProps {
  children: JSX.Element;
  allowedRoles?: string[]; 
}

interface TokenPayload {
  type: string;
  exp: number;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const token = sessionStorage.getItem('token'); 
  if (token === null || !isTokenValid(token)) {
    return <Navigate to="/" replace />; 
  }

  const decodedToken = jwtDecode<TokenPayload>(token);

  if (allowedRoles && !allowedRoles.includes(decodedToken.type)) {
    return <Navigate to="/home" replace />;
  }

  return children; 
};

export default ProtectedRoute;
