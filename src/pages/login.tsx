import React, { FC } from 'react';
import { User_login } from '../utils/user_structure';
import { fields_login } from '../utils/field';
import Form from '../components/Form';
import { useNavigate } from 'react-router-dom';
import { backgroundUrl } from '../assets/Images';

const Login: FC = () => {
  const navigate = useNavigate();

  const handleLogin = (user: User_login) => {
    console.log(user);
  }

  const handleRedirectCreateAccount = () => {
    navigate('/register');
  }

  const handleRedirectPassword = () => {
    navigate('/forgot_password');
  }

  return (
    <div className='flex flex-grow items-center justify-center fullscreen-background'  style={{ backgroundImage: `url(${backgroundUrl})` }}>
      <Form<User_login>
        title='Login'
        fields={fields_login}
        onSubmit={handleLogin}
        redirect={true}
        onRedirectCreateAccount={handleRedirectCreateAccount}
        onRedirectPassword={handleRedirectPassword}
      />
    </div>
  );
};

export default Login;