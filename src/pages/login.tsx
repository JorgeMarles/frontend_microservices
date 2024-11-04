import { FC, useState } from 'react';
import Header from '../components/Header';

interface LoginProps {
  title ?: string;
}

const Login: FC<LoginProps> = ({ title }) => {

  const [contador, setContador] = useState(0); 

  const handleAdd = () => {
    setContador(contador + 1);
  }
  

  return (
    <>
      <Header></Header>
      <h1>{title}</h1>
      <h1>{contador}</h1>
      <button onClick={handleAdd}></button>
      <h1 className="text-4xl font-bold underline">
        Hello world!
      </h1>
    </>
  );
};

export default Login;