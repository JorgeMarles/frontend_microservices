import { FC } from 'react';
import { User } from '../utils/interfaces';
import { fields_register } from '../utils/field';
import Form from '../components/Form';
import { backgroundURL } from '../assets/Images';
import { useNavigate } from 'react-router-dom';
import { Create } from '../fetch/UserFetch';

const Register: FC = () => {
  const navigate = useNavigate();
  const { createUser } = Create();

  const handleRegister = (user: User) => {
    createUser(user);
    navigate('/');
  }


  return (
    <div className='flex items-center justify-center fullscreen-background'  style={{ backgroundImage: `url(${backgroundURL})` }}>
      <Form<User>
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