import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Register from './pages/Register';
import Login from './pages/Login';
import UpdatePassword from './pages/UpdatePassword';
import Home from './pages/problems/Home';
import CreateProblem from './pages/problems/CreateProblem';
import Submission from './pages/problems/Submission';
import Ranking from './pages/problems/Ranking';
import Problem from './pages/problems/Problem';

const App: React.FC = () => {


  return (
    <div className='bg-gray-300 h-screen flex flex-col'>
      <Header></Header>
      <div className='flex flex-grow'>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotPassword" element={<UpdatePassword />} />
          <Route path="/home" element={<Home></Home>} />
          <Route path="/createProblem" element={<CreateProblem />} />
          <Route path="/submissions" element={<Submission />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/problem/:id" element={<Problem />} />
          <Route path="/createProblem/:id" element={<CreateProblem />} />
        </Routes>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App
