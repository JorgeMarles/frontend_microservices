import React, { useState } from 'react';
import { Fields } from '../utils/field';

interface FormProps<T> {
    title: string;
    fields: Fields;
    onSubmit: (data: T) => void;
    onRedirect?: () => void;
}


const Form = <T extends object>({
    title,
    fields,
    onSubmit,
    onRedirect
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
        <div className='bg-red-500 p-10 m-5 rounded-2xl bg-opacity-70 backdrop-blur-md'>
            <h1 className='text-5xl font-serif font-bold mb-5'>Login</h1>
            <form onSubmit={handleSubmit}>
                {Object.keys(fields).map(key => (
                    <div key={key} className="flex items-stretch border border-black bg-white  w-64 m-3">
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
                    // <div className="flex items-center border border-black bg-red-600 rounded-md p-2 w-64">
                    //     <AtSymbolIcon className="h-5 w-5 text-black mr-2" />
                    //     <input
                    //         type="email"
                    //         placeholder="Email"
                    //         className="bg-transparent border-none outline-none placeholder-gray-300 text-black flex-grow"
                    //     />
                    // </div>
                ))}
                <button type="submit" className='rounded-full bg-blue-800 m-5 px-5 py-2 text-gray-200 hover:text-gray-700 bg-blue-800 hover:bg-blue-100 '>
                    Enviar
                </button>
            </form>
        </div>
    );
};

export default Form;