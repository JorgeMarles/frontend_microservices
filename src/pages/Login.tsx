import { FC } from 'react';
import { User } from '../utils/interfaces';
import { fields_login } from '../utils/field';
import Form from '../components/Form';
import { useNavigate } from 'react-router-dom';
import { backgroundURL } from '../assets/Images';
import { LoginSession } from '../fetch/LoginFetch';
import { isTokenValid } from '../session/Token';

const Login: FC = () => {
  const navigate = useNavigate();
  const { loginUser, success } = LoginSession();

  const handleLogin = async (user: User) => {
    const response = await loginUser(user);
    console.log(response);
    console.log(isTokenValid(response.token));
    if (success) {
      console.log("entro")
      // sessionStorage.setItem("token", response.token);
      // navigate('/home');
    }
    else {
      alert("User data incorrect")
    }
  }

  return (
    <div className='flex items-center justify-center fullscreen-background' style={{ backgroundImage: `url(${backgroundURL})` }}>
      <Form<User>
        title='Login'
        fields={fields_login}
        onSubmit={handleLogin}
        textSubmit='Submit'
        redirect={true}
        redirectCreateAccount='/register'
        redirectPassword='/forgotPassword'
        sendCode={false}
      />
    </div>
  );
};

export default Login;
