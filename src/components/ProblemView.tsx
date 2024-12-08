import { FC, useEffect } from 'react';
import { Problem } from '../utils/interfaces';
import { Fields } from '../utils/field';
import { PencilIcon } from '@heroicons/react/24/outline';

interface ProblemProps {
    data: Problem;
    fields: Fields;
    onView: (data: Problem) => void;
};

interface Window extends globalThis.Window {
    MathJax?: {
        typeset: () => void;
    }
};

const ProblemView: FC<ProblemProps> = ({ data, fields, onView }) => {

    useEffect(() => {
        const _window: Window = window;
        if (typeof _window?.MathJax !== "undefined") {
            _window.MathJax.typeset();
        }
    }, [data])
    const handleView = () => {
        onView(data);
    }

    return (
        <div className='flex flex-col items-center m-5 p-3'>
            <div className='flex w-full justify-between'>
                <div key={"name"} className='outline-none w-full text-stroke font-Jomhuria md:text-8xl'>
                    <p>{data.name}</p>
                </div>
                <button type="button" onClick={() => handleView()}>
                    <PencilIcon className="h-8 w-8 text-blue-900" />
                </button>
            </div>
            <div className='flex gap-5'>
                <p>
                    <strong>topic:</strong> {data.topic.name}
                </p>
                <p>
                    <strong>difficulty:</strong> {data.difficulty}
                </p>
            </div>

            {Object.keys(fields).map(key => (
                <div key={key} className="w-full">
                    {key === "example_input" && (
                        <h1 className='font-Jomhuria text-7xl'>
                            Example
                        </h1>
                    )}
                    <div
                        className={`${key === "example_input" || key === "example_output" ? "border-x-2 border-t-2 border-black" : ""}`}
                    >
                        <div className={`flex items-center justify-between ${key === "example_input" || key === "example_output" ? "px-2 pt-2 bg-gray-400 border-b-2 border-black" : ""}`}>
                            <div className='font-Jomhuria text-5xl'>
                                {key === "example_input"
                                    ? "Input"
                                    : key === "example_output"
                                        ? "Output"
                                        : fields[key].name.charAt(0).toUpperCase() + fields[key].name.slice(1)}
                            </div>
                        </div>
                        <p className={`${key === "example_input" || key === "example_output" ? "bg-gray-100 p-2" : ""} ${key === "example_output" ? "border-b-2 border-black" : ""}`}>
                            {typeof data[key as keyof Problem] === "string" ? (data[key as keyof Problem] as string) : ""}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProblemView;
