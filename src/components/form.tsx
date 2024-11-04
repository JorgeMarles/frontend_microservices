import React, { FC } from 'react';

interface FormProps {
  title : string;
}

const Form: FC<FormProps> = ({ title }) => {

  

  return (
    <>
        <h1>{title}</h1>
    </>
  );
};

export default Form;