import React, { FC } from 'react';
import { User_registrer } from '../utils/user_structure';
import { fields_register } from '../utils/field';
import Form from '../components/Form';
import { backgroundURL } from '../assets/Images';

const Register: FC = () => {

  const handleLogin = (user: User_registrer) => {
    console.log(user);
  }


  return (
    <div className='flex items-center justify-center fullscreen-background'  style={{ backgroundImage: `url(${backgroundURL})` }}>
      <Form<User_registrer>
        title='Register'
        fields={fields_register}
        onSubmit={handleLogin}
        redirect={false}
      />
    </div>
  );
};

export default Register;