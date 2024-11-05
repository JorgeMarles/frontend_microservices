import React, { useState } from 'react';
import { Fields } from '../utils/field';

interface FormProps<T> {
    title: string;
    fields: Fields;
    onSubmit: (data: T) => void;
    textSubmit: string;
    redirect: boolean;
    onRedirectCreateAccount?: () => void;
    onRedirectPassword?: () => void;
}

const Form = <T extends object>({
    title,
    fields,
    onSubmit,
    textSubmit,
    redirect,
    onRedirectCreateAccount,
    onRedirectPassword
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
        setFormData({});
    };

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
                <button type="submit" className='rounded-full bg-white m-1 px-5 py-2 text-black hover:text-black hover:bg-gray-300 border border-black '>
                    {textSubmit}
                </button>
                <div className='flex items-center'>
                    <a href="#" className="text-center w-full mr-5 ">
                        {
                            redirect && (
                                <span className="text-black underline" onClick={onRedirectPassword}>Forgot your password?</span>
                            )
                        }
                    </a>
                    <a href="#" className="text-center w-full ml-5 ">
                        {
                            redirect && (
                                <span className="text-black underline" onClick={onRedirectCreateAccount}>Create account</span>
                            )
                        }
                    </a>
                </div>
            </form>
        </div>
    );
};

export default Form;