import React, { useState } from 'react';
import { Fields } from '../utils/field';

interface ProblemProps<T> {
    fields: Fields;
    onSubmit: (data: T) => void;
}

const Problem = <T extends object>({
    fields,
    onSubmit
}: ProblemProps<T>) => {

    const [formData, setFormData] = useState({});

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData as T);
    };


    return (
        <div className='w-screen flex justify-between'>
            <form onSubmit={handleSubmit} className='flex flex-col items-center w-full m-5 px-5'>
                <div className='flex'>
                    <div key={"name"} className="">
                        <input
                            className='p-2 w-full outline-none'
                            type={"text"}
                            name={"name"}
                            onChange={handleChange}
                            placeholder={"Problem's name"}
                            required
                        />
                    </div>
                    <div key={"topic"} className="flex">
                        <div className=''>
                            topic
                        </div>
                        <input
                            className='p-2 w-full '
                            type={"text"}
                            name={"topic"}
                            onChange={handleChange}
                            placeholder={"Topic of the problem"}
                            required
                        />
                    </div>
                </div>
                {Object.keys(fields).map(key => (

                    <div key={key} className="w-full px-10">
                        {key === "example_input" && (
                            <h1>
                                Example
                            </h1>
                        )}
                        <div className='flex'>
                            <div className=''>
                                {key === "example_input" ? "input" : key === "example_output" ? "output" : fields[key].name}
                            </div>
                            <div className=''>
                                {fields[key].icon}
                            </div>
                        </div>
                        <textarea
                            className='p-2 w-full outline-none'
                            rows={4}
                            id={key}
                            name={fields[key].name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                ))}
                <div className='flex items-center justify-center'>
                    <button type="submit" className='rounded-full bg-white m-1 px-5 py-2 text-black hover:text-black hover:bg-gray-300 border border-black '>
                        Create Problem
                    </button>
                </div>
            </form>
            <div className='mx-5'>
                Problem's files
            </div>
        </div>
    );
};

export default Problem;
