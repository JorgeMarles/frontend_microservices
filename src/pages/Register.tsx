import { FC } from 'react';
import { User } from '../utils/interfaces';
import { fields_register } from '../utils/field';
import Form from '../components/Form';
import { backgroundURL } from '../assets/Images';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../fetch/UserFetch';

const Register: FC = () => {
  const navigate = useNavigate();

  const handleRegister = async (user: User) => {
    if (user.password !== user.repeat_password) {
      alert("Passwords do not match. Please verify and try again.");
      return;
    }

    try {
      const response = await createUser(user);
      if (response.status === 201) {
        alert("User successfully created");
        navigate('/');
      } else {
        alert(`Error creating user: ${response.statusText || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Error creating user");
    }
  };

  return (
    <div
      className='flex items-center justify-center fullscreen-background'
      style={{ backgroundImage: `url(${backgroundURL})` }}
    >
      <Form<User>
        title='Register'
        fields={fields_register}
        onSubmit={handleRegister}
        textSubmit='Create account'
        redirect={false}
        sendCode={false}
      />
    </div>
  );
};

export default Register;
