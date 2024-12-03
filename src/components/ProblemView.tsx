import { FC, useEffect } from 'react';
import { Problem } from '../utils/interfaces';
import { Fields } from '../utils/field';
import { EyeIcon } from '@heroicons/react/24/outline';

interface ProblemProps {
    data: Problem;
    fields: Fields;
    onSubmit: (data: Problem) => void;
    onView: (data: Problem) => void;
};

interface Window extends globalThis.Window {
    MathJax?: {
        typeset: () => void;
    }
};

const ProblemView: FC<ProblemProps> = ({ data,  fields, onSubmit, onView }) => {

    useEffect(() => {
        const _window : Window = window;
        if (typeof _window?.MathJax !== "undefined") {
            _window.MathJax.typeset();
        }
    },[])

    const handleView = () => {
        onView(data);
    }

    return (
        <div className='flex flex-col items-center m-5 p-3'>
            <div className='grid grid-cols-10 gap-4 pb-5 flex w-full'>
                <div key={"name"} className='flex-grow col-span-4'>
                    <text className='p-2 outline-none w-full'>{data.name}</text>
                </div>
                <div className='col-span-3'>
                    <text>{data.topic.name}</text>
                </div>
                <div className='col-span-2'>
                    <text>{data.difficulty}</text>
                </div>
                <div className='flex items-center justify-center'>
                    <button type="button" onClick={() => handleView()}>
                        <EyeIcon className="h-8 w-8 text-blue-900"/>
                    </button>
                </div>
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
                    </div>
                    {typeof data[key as keyof Problem] === "string" ? (data[key as keyof Problem] as string) : ""}
                </div>
            ))}
        </div>
    );
};

export default ProblemView;
