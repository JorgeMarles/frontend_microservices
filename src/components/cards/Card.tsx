import { DocumentTextIcon } from '@heroicons/react/20/solid';
import { FC } from 'react';

interface CardProps {
    name: string;
    onClick: (topic: string) => void;
    isSelected: boolean;
}

const Card: FC<CardProps> = ({ name, onClick, isSelected }) => {

    const buttonProperties = "rounded-2xl border-2 border-black flex items-center h-28";
    const defaultColor = "bg-gray-400";
    const selectedColor = "bg-red-400";
 
    const handleClick = () => {
        onClick(name);
    };

    return (
        <>
            <button className={buttonProperties + " " + (isSelected ? selectedColor : defaultColor)} onClick={handleClick}>
                <div className='w-1/12'></div>
                <DocumentTextIcon className="text-white w-1/6"/>
                <h1 className='text-stroke font-Jomhuria text-6xl p-1 flex-grow'>
                    {name}
                </h1>
            </button>
        </>
    );
};

export default Card;