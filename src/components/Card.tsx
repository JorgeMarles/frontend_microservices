import { FC } from 'react';

interface CardProps {
    name: string;
}

const Card: FC<CardProps> = ({ name }) => {

    return (
        <div className='bg-gray-400 pb-5 px-8 m-5 rounded-2xl  border-2 border-black flex flex-col justify-center h-40 w-64 text-center'>
            <h1 className='text-stroke font-Jomhuria text-6xl'>
                {name}
            </h1>
        </div>
    );
};

export default Card;