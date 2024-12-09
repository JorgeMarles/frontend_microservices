import React, { useState } from 'react';
import { Fields } from '../../utils/field';
import { NavLink } from 'react-router-dom';

interface FormProps<T> {
    title: string;
    fields: Fields;
    onSubmit: (data: T) => void;
    textSubmit: string;
    redirect: boolean;
    redirectCreateAccount?: string;
    redirectPassword?: string;
    onSend?: (data: T) => void;
    sendCode: boolean;
}

const Form = <T extends object>({
    title,
    fields,
    onSubmit,
    textSubmit,
    redirect,
    redirectCreateAccount,
    redirectPassword,
    onSend,
    sendCode
}: FormProps<T>) => {

    const [formData, setFormData] = useState({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        const parsedValue = type === 'number' ? parseFloat(value) : value;
        setFormData({
            ...formData,
            [name]: parsedValue,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData as T);
    };

    const handleSend = () => {
        if(!onSend) return;
        onSend(formData as T);
    }


    return (
        <div className='bg-red-500 pb-5 px-8 m-5 rounded-2xl bg-opacity-70 backdrop-blur-md border-2 border-black'>
            <h1 className='text-8xl text-stroke font-Jomhuria'>{title}</h1>
            <form onSubmit={handleSubmit} className='flex flex-col items-center m-0'>
                {Object.keys(fields).map(key => (
                    <div key={key} className="flex items-stretch border border-black bg-white  w-64 mx-2 mb-2">
                        <div className='flex items-center justify-center p-2 border-r border-black'>
                            {fields[key].icon}
                        </div>
                        <input
                            className='p-2 w-full outline-none'
                            type={fields[key].type}
                            name={key}
                            onChange={handleChange}
                            placeholder={fields[key].name}
                            required
                        />
                    </div>
                ))}
                <div className='flex items-center justify-center'>
                    <button type="submit" className='rounded-full bg-white m-1 px-5 py-2 text-black hover:text-black hover:bg-gray-300 border border-black '>
                        {textSubmit}
                    </button>
                    {sendCode && (
                        <button type="button" onClick={handleSend} className='rounded-full bg-white m-1 px-5 py-2 text-black hover:text-black hover:bg-gray-300 border border-black '>
                            Send code
                        </button>
                    )}
                </div>
                {redirect && (
                    <div className='grid grid-cols-2 w-full text-center flex items-center'>
                        <div className=''>
                            <NavLink
                                to={redirectPassword || ''}
                                className='text-black underline'
                            >
                                Forgot your  <br /> password?
                            </NavLink>
                        </div>
                        <div>
                            <NavLink
                                to={redirectCreateAccount || ''}
                                className='text-black underline'
                            >
                                Create account
                            </NavLink>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
};

export default Form;
