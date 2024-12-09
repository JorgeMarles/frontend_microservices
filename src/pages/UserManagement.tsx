import { FC, useEffect, useState } from 'react';
import UserCard from '../components/cards/UserCard';
import Menu from '../components/Menu';
import { getEmailUser } from '../session/Token';
import { getUser, getUsers } from '../fetch/UserFetch';
import { User } from '../utils/interfaces';
import Table from '../components/Table';

const UserManagement: FC = () => {
    const [user, setUser] = useState<User>({} as User);
    const [users, setUsers] = useState<User[]>([]);
    
    const columns = [
        { label: "User", key: "nickname" },
        { label: "Email", key: "email" }
    ];

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const email = getEmailUser();
                const response = await getUser(email);
                setUser(response.data.user);
            }
            catch (error) {
                console.error('Error fetching data: ', error);
            }
        }

        const fetchUsers = async () => {
            try {
                const response = await getUsers();
                setUsers(response.data.users);
            }
            catch (error) {
                console.error('Error fetching data: ', error);
            }
        }

        fetchUser();
        fetchUsers();
    }, []);

    const handleUpdate = () => {
        alert("update")
    }

    const handleChange = (index: number) => {
        alert(users[index].name)
    }

    return (
        <div className='w-full bg-gray-300'>
            <Menu />
            <div className='md:grid md:grid-cols-7 mx-10 my-5 flex items-center'>
                <div className='col-span-3 mb-20 mr-14'>
                    <UserCard
                        name='Users'
                        user={user}
                        onSubmit={handleUpdate}
                    />
                </div>
                <div className='col-span-4'>
                    <Table<User>
                        data={users}
                        columns={columns}
                        enableNumberPagination={true}
                        header={true}
                        onChange={handleChange}
                        pagination={6}
                    />
                </div>
            </div>
        </div>
    );
};

export default UserManagement;
