import { FC } from 'react';

interface CardProps {
    name: string;
    onSubmit: (data: string) => void;
}

const UserCard: FC<CardProps> = ({ name, onSubmit }) => {

    const handleSubmit = () => {
        onSubmit(name);
    };

    return (
        <div className='w-full px-7 py-3'>
            <h1 className='font-Jomhuria text-7xl'>
                {name}
            </h1>
        </div>
    );
};

export default UserCard;