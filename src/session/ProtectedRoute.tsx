import React from 'react';
import { Navigate } from 'react-router-dom';
import { isTokenValid } from './Token';

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = sessionStorage.getItem('token'); 

  if (token === null || !isTokenValid(token)) {
    return <Navigate to="/" replace />; 
  }

  return children; 
};

export default ProtectedRoute;
