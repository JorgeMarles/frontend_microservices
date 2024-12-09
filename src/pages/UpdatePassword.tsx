import { FC } from 'react';
import { UserUpdatePassword } from '../utils/interfaces';
import { fields_update_password } from '../utils/field';
import Form from '../components/forms/Form';
import { backgroundURL } from '../assets/Images';
import { sendCode } from '../fetch/EmailFetch';
import { updatePassword } from '../fetch/UserFetch';
import { useNavigate } from 'react-router-dom';

const UpdatePassword: FC = () => {

  const navigate = useNavigate();
  const handleUpdatePassword = async (user: UserUpdatePassword) => {
    if (user.password !== user.repeat_password) {
      alert("Passwords do not match. Please verify and try again.");
      return;
    }
    try {
      const response = await updatePassword(user);
      if (response.status === 200) {
        alert("Password update successful.");
        navigate('/');
      } else {
        alert(`Error sending email: ${response.statusText || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Error sending email");
    }
  }

  const handleSendCode = async (user: UserUpdatePassword) => {
    if (!user.email) {
      alert("Please enter the email.");
      return;
    }
    try {
      const response = await sendCode(user);
      if (response.status === 200) {
        alert("Please check your email.");

      } else {
        alert(`Error sending email: ${response.statusText || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Error sending email");
    }
  }

  return (
    <div className='flex items-center justify-center fullscreen-background' style={{ backgroundImage: `url(${backgroundURL})` }}>
      <Form<UserUpdatePassword>
        title='Update'
        fields={fields_update_password}
        onSubmit={handleUpdatePassword}
        onSend={handleSendCode}
        textSubmit='Update'
        redirect={false}
        sendCode={true}
      />
    </div>
  );
};

export default UpdatePassword;