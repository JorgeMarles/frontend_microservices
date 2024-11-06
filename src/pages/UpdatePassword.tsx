import React, { FC } from 'react';
import { User_update_password } from '../utils/user_structure';
import { fields_update_password } from '../utils/field';
import Form from '../components/Form';
import { backgroundURL } from '../assets/Images';

const UpdatePassword: FC = () => {

  const handleUpdatePassword = (user: User_update_password) => {
    console.log(user);
  }

  const handleSendCode = () => {
    console.log('send code');
  }

  return (
    <div className='flex items-center justify-center fullscreen-background'  style={{ backgroundImage: `url(${backgroundURL})` }}>
      <Form<User_update_password>
        title='Update'
        fields={fields_update_password}
        onSubmit={handleUpdatePassword}
        onSend={handleSendCode}
        textSubmit ='Update'
        redirect={false}
        sendCode={true}
      />
    </div>
  );
};

export default UpdatePassword;