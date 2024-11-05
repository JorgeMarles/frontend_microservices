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
        <div className='bg-red-600 pb-5 pl-5 pr-5 m-5 rounded-2xl bg-opacity-70 backdrop-blur-md border-2 border-black'>
            <h1 className='text-8xl text-stroke font-Jomhuria'>{title}</h1>
            <form onSubmit={handleSubmit} className='flex flex-col items-center'>
                {Object.keys(fields).map(key => (
                    <div key={key} className="flex items-stretch border border-black bg-white  w-64 m-2">
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
                <button type="submit" className='rounded-full bg-white m-5 px-5 py-2 text-black hover:text-black hover:bg-gray-300 border border-black '>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Form;