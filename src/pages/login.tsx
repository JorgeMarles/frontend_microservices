import React, { FC, useState } from 'react';
import { User_login } from '../utils/user_structure';
import Form from '../components/Form';
import { fields_login } from '../utils/field';

interface LoginProps {
  title?: string;
}

const Login: FC<LoginProps> = ({ title }) => {

  console.log(title);

  const handleLogin = (user: User_login) => {
    console.log(user);
  }

  return (
    <div className='w-screen h-screen flex bg-cover items-center justify-center'
      style={{
        backgroundImage: 'url(/background.jpg)', // assuming the image is in /public/images/your-image.jpg
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
    }}
    >
      <Form<User_login>
        title='Login'
        fields={fields_login}
        onSubmit={handleLogin}
      />
    </div>
  );
};

export default Login;