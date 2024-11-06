import { FC } from 'react';
import { User_login } from '../utils/user_structure';
import { fields_login } from '../utils/field';
import Form from '../components/Form';

import Header from '../components/Header';

interface LoginProps {
  title?: string;
}

const Login: FC<LoginProps> = ({ title }) => {

  console.log(title);

  const handleLogin = (user: User_login) => {
    console.log(user);
  }

  return (
    <div className='w-screen h-screen flex flex-col'
      style={{
        backgroundImage: 'url(/background.jpg)', // assuming the image is in /public/images/your-image.jpg
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
      }}
    >
      <Header></Header>
      <div className='flex flex-grow items-center justify-center'>
        <Form<User_login>
          title='Login'
          fields={fields_login}
          onSubmit={handleLogin}
        />
      </div>
    </div>
  );
};

export default Login;