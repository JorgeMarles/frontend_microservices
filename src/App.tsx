import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/login';

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </>
  );
}

export default App
