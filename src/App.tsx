import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/login'

import Header from './components/Header';

const App: React.FC = () => {

  
  return (
    <div className='h-screen w-screen flex flex-col'>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App
