import React, { useState } from 'react';
import { Fields } from '../utils/field';
import Combobox from './Combobox';

interface ProblemProps<T> {
    fields: Fields;
    onSubmit: (data: T) => void;
    topics: { id: number; name: string }[];
}

const Problem = <T extends object>({
    fields,
    onSubmit,
    topics
}: ProblemProps<T>) => {

    const [formData, setFormData] = useState({});
    const [selectedTopic, setSelectedTopic] = useState<string | undefined>('');


    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleChangeTopic = (value: string | undefined) => {
        setSelectedTopic(value);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedTopic) {
            alert("Please select a topic");
            return;
        }
        setFormData({
            ...formData,
            ["topic"]: selectedTopic,
        });
        onSubmit(formData as T);
    };


    return (
        <div className='grid grid-cols-3 gap-4'>
            <form onSubmit={handleSubmit} className='col-span-2 flex flex-col items-center m-5 p-5'>
                <div className='grid grid-cols-3 gap-4 pb-5'>
                    <div key={"name"} className="col-span-2">
                        <input
                            className='p-2 outline-none w-full'
                            type={"text"}
                            name={"name"}
                            onChange={handleChange}
                            placeholder={"Problem's name"}
                            required
                        />
                    </div>
                    <Combobox
                        data={topics}
                        onFilter={handleChangeTopic}
                        title='topic'
                    />
                </div>
                {Object.keys(fields).map(key => (

                    <div key={key} className="w-full">
                        {key === "example_input" && (
                            <h1 className='font-Jomhuria text-7xl'>
                                Example
                            </h1>
                        )}
                        <div className='flex items-center justify-between'>
                            <div className='font-Jomhuria text-5xl'>
                                {key === "example_input" ? "input" : key === "example_output" ? "output" : fields[key].name}
                            </div>
                            <div className=''>
                                {fields[key].icon}
                            </div>
                        </div>
                        <textarea
                            className='p-2 w-full outline-none'
                            rows={5}
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
            <div className='mx-5 flex'>
                <div className="h-full w-1 bg-gray-500 mt-5"></div>
                <div className='pl-5 ml-5 w-full'>
                    <h1 className='font-Jomhuria text-7xl text-center'>
                        Problem's files
                    </h1>
                    <div className='bg-white pb-5 px-8 m-5 rounded-2xl  border-2 border-black flex flex-col justify-center h-48'>
                        <h1 className='text-center'>Solution.cpp</h1>
                        <button className='rounded-full bg-gray-300 m-1 px-5 py-2 text-black hover:text-black hover:bg-gray-500 border border-black '>
                            Select file
                        </button>
                        <button className='rounded-full bg-gray-300 m-1 px-5 py-2 text-black hover:text-black hover:bg-gray-500 border border-black '>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Problem;
