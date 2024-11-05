import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login title='hola' />} />
      </Routes>
    </>
  );
}

export default App
