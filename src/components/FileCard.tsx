import { FC, useState } from 'react';

interface CardProps {
    name: string;
    onSubmit: (data: string) => void;
}

const FileCard: FC<CardProps> = ({ name, onSubmit }) => {
    const [fileName, setFileName] = useState<string>("You have to select a file");

    const handleSubmit = () => {
        onSubmit(name);
    };

    const handleUploadFile = () => {
        setFileName("File.cpp");
        alert("subiendo...");
    };

    return (
        <div className='w-full px-7 py-3'>
            <h1 className='font-Jomhuria text-7xl'>
                {name}
            </h1>
            <div className='bg-white pb-5 px-8 rounded-2xl border-2 border-black flex flex-col justify-center h-48'>
                <h1 className='text-center pb-2'>
                    {fileName}
                </h1>
                <button className='rounded-full bg-gray-300 m-1 px-5 py-2 text-black hover:text-black hover:bg-gray-500 border border-black' onClick={handleUploadFile}>
                    Select file
                </button>
                <button className='rounded-full bg-gray-300 m-1 px-5 py-2 text-black hover:text-black hover:bg-gray-500 border border-black' onClick={handleSubmit}>
                    Submit
                </button>
            </div>
        </div>
    );
};

export default FileCard;