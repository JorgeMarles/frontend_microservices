import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Register from './pages/Register';
import Login from './pages/Login';
import UpdatePassword from './pages/UpdatePassword';
import ProblemList from './pages/ProblemsList';
import CreateProblem from './pages/problems/CreateProblem';

const App: React.FC = () => {


  return (
    <div className='h-screen w-screen flex flex-col'>
      <Header></Header>
      <div className='flex flex-grow'>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot_password" element={<UpdatePassword />} />
          <Route path="/problems" element={<ProblemList></ProblemList>} />
          <Route path="/create_problem" element={<CreateProblem />} />
        </Routes>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App
