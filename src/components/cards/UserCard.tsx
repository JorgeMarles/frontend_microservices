import { FC } from 'react';
import { User } from '../../utils/interfaces';
import { PencilSquareIcon } from '@heroicons/react/24/outline';

interface UserCardProps {
    name: string;
    onSubmit: () => void;
    user: User
}

const UserCard: FC<UserCardProps> = ({ name, onSubmit, user }) => {

    const handleSubmit = () => {
        onSubmit();
    };

    return (
        <div className='w-full'>
            <h1 className='md:text-8xl text-6xl text-stroke font-Jomhuria'>
                {name}
            </h1>
            <div className='mx-10 py-16 px-16 bg-gray-400'>
                {user.type && (
                    <h1 className='md:text-7xl text-6xl text-stroke font-Jomhuria'>
                        Admin's Info
                    </h1>
                )}
                <h1 className='md:text-6xl text-5xl font-Jomhuria'>
                    Name
                </h1>
                <p className='text-lg'>
                    {user.name}
                </p>
                <h1 className='md:text-6xl text-5xl font-Jomhuria'>
                    Email
                </h1>
                <p className='text-lg'>
                    {user.email}
                </p>
                <div className='mt-16 flex justify-end'>
                    <button className='bg-gray-600 text-white py-2 px-4 rounded rounded-2xl' onClick={handleSubmit}>
                        <div className='flex items-center'>
                            <p className='text-base'>Update</p>
                            <PencilSquareIcon className="h-7 w-7 ml-2" />
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserCard;