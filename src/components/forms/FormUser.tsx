import React, { FC, useState } from 'react';
import { User } from '../../utils/interfaces';
import { XMarkIcon } from '@heroicons/react/24/outline';
interface FormProps {
    onSubmit: (data: User) => void;
    onClose: () => void;
    data: User;
    password: boolean
}

const FormUser: FC<FormProps> = ({ data, onSubmit, onClose, password }) => {

    const [formData, setFormData] = useState<User>(data);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className='fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50'>
            <div className="bg-gray-800 bg-opacity-80 backdrop-blur-sm p-7 rounded-lg shadow-lg relative">
                <div className='w-full flex justify-end'>
                    <button className='' onClick={onClose}>
                        <XMarkIcon className="h-8 w-8 text-white " />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className='flex flex-col items-center m-0'>
                    <div className='grid grid-cols-2 gap-10 mx-5 mb-7'>
                        <div className=''>
                            <div className='mb-3'>
                                <h1 className='text-5xl text-stroke font-Jomhuria'>
                                    Name
                                </h1>
                                <input
                                    className='px-5 py-2 w-full outline-none rounded-full'
                                    type="text"
                                    name="name"
                                    onChange={handleChange}
                                    value={formData.name}
                                    placeholder="User's name"
                                    required
                                />
                            </div >
                            <div className='mb-3'>
                                <h1 className='text-5xl text-stroke font-Jomhuria'>
                                    Email
                                </h1>
                                <input
                                    className='px-5 py-2 w-full outline-none rounded-full'
                                    type="email"
                                    name="email"
                                    onChange={handleChange}
                                    value={formData.email}
                                    placeholder="User's email"
                                    required
                                />
                            </div>
                            <div className=''>
                                <h1 className='text-5xl text-stroke font-Jomhuria'>
                                    Nickname
                                </h1>
                                <input
                                    className='px-5 py-2 w-full outline-none rounded-full'
                                    type="text"
                                    name="nickname"
                                    onChange={handleChange}
                                    value={formData.nickname}
                                    placeholder="User's nickname"
                                    required
                                />
                            </div>
                        </div>
                        <div className=''>
                            {password && (
                                <div className='mb-3'>
                                    <h1 className='text-5xl text-stroke font-Jomhuria'>
                                        Old password
                                    </h1>
                                    <input
                                        className='px-5 py-2 w-full outline-none rounded-full'
                                        type="password"
                                        name="password"
                                        onChange={handleChange}
                                        placeholder="Current Password"
                                        required
                                    />
                                </div>
                            )}
                            <div className='mb-3'>
                                <h1 className='text-5xl text-stroke font-Jomhuria'>
                                    New password
                                </h1>
                                <input
                                    className='px-5 py-2 w-full outline-none rounded-full'
                                    type="password"
                                    name="newPassword"
                                    onChange={handleChange}
                                    placeholder="New password"
                                />
                            </div>
                            <div>
                                <h1 className='text-5xl text-stroke font-Jomhuria'>
                                    Repeat new password
                                </h1>
                                <input
                                    className='px-5 py-2 w-full outline-none rounded-full'
                                    type="password"
                                    name="repeatNewPassword"
                                    onChange={handleChange}
                                    placeholder="Repeat new password"
                                />
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center justify-center'>
                        <button type="button" onClick={onClose} className='w-full rounded-full bg-red-800 m-1 px-5 pt-2 text-5xl text-stroke font-Jomhuria hover:text-black hover:bg-gray-300 border border-black '>
                            Cancel
                        </button>
                        <button type="submit" className='w-full rounded-full bg-green-800 m-1 px-5 pt-2 text-5xl text-stroke font-Jomhuria hover:text-black hover:bg-gray-300 border border-black '>
                            Accepted
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FormUser;
