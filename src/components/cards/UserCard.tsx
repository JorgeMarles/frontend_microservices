import { FC } from 'react';
import { User } from '../../utils/interfaces';
import { PencilSquareIcon } from '@heroicons/react/24/outline';

interface UserInfo extends User {
    totalProblems?: number;
}

interface UserCardProps {
    name: string;
    onSubmit: () => void;
    user: UserInfo
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
            <div className="mx-10 sm:mx-2 p-16 sm:p-8 bg-gray-400 rounded-lg shadow-lg">
                {user.type && (
                    <h1 className="md:text-7xl text-6xl text-stroke font-Jomhuria text-gray-900">
                        Admin's Info
                    </h1>
                )}
                <div className="space-y-6">
                    <div>
                        <h2 className="md:text-6xl text-5xl font-Jomhuria text-gray-900">
                            Name
                        </h2>
                        <p className="text-xl text-gray-800 mt-2">{user.name}</p>
                    </div>
                    <div>
                        <h2 className="md:text-6xl text-5xl font-Jomhuria text-gray-900">
                            Email
                        </h2>
                        <p className="text-xl text-gray-800 mt-2">{user.email}</p>
                    </div>
                </div>

                <div className="mt-10 flex justify-end">
                    <button
                        className="bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-full flex items-center shadow-md transition-all duration-100"
                        onClick={handleSubmit}
                    >
                        <p className="text-base font-medium text-lg">Update</p>
                        <PencilSquareIcon className="h-6 w-6 ml-3" />
                    </button>
                </div>
            </div>

        </div>
    );
};

export default UserCard;