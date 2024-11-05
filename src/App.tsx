import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/login'

import Header from './components/Header';
import Footer from './components/Footer';

const App: React.FC = () => {

  
  return (
    <div className='h-screen w-screen flex flex-col'>
      <Header></Header>
      <div className='flex flex-grow'>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App
