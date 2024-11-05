import React, { FC } from 'react';
import { User_register } from '../utils/user_structure';
import { fields_register } from '../utils/field';
import Form from '../components/Form';
import { backgroundURL } from '../assets/Images';

const Register: FC = () => {

  const handleRegister = (user: User_register) => {
    console.log(user);
  }


  return (
    <div className='flex items-center justify-center fullscreen-background'  style={{ backgroundImage: `url(${backgroundURL})` }}>
      <Form<User_register>
        title='Register'
        fields={fields_register}
        onSubmit={handleRegister}
        textSubmit ='Create account'
        redirect={false}
        sendCode={false}
      />
    </div>
  );
};

export default Register;