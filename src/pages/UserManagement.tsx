import { FC, useEffect, useState } from 'react';
import UserCard from '../components/cards/UserCard';
import Menu from '../components/Menu';
import { getEmailUser } from '../session/Token';
import { getUser, getUsers, updateUser } from '../fetch/UserFetch';
import { User } from '../utils/interfaces';
import Table from '../components/Table';
import FormUser from '../components/forms/FormUser';
import { user as emptyUser } from '../utils/emptyEntities';

const UserManagement: FC = () => {
    const [user, setUser] = useState<User>(emptyUser);
    const [admin, setAdmin] = useState<User>(emptyUser);
    const [users, setUsers] = useState<User[]>([]);
    const [edit, setEdit] = useState(false);
    const [action, setAction] = useState(0);

    const columns = [
        { label: "User", key: "nickname" },
        { label: "Email", key: "email" }
    ];

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const email = getEmailUser();
                const response = await getUser(email);
                setAdmin(response.data.user);
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
    }, [action]);

    const handleUpdateMyInfo = () => {
        setEdit(true);
        setUser(admin);
    }

    const handleUpdate = async (user: User) => { 
        if ("newPassword" in user) {
            if ("repeatNewPassword" in user) {
                if (user.newPassword !== user.repeatNewPassword) {
                    alert("Passwords do not match. Please verify and try again.");
                    return;
                }
            }
            else {
                alert("Please you forgot to add the repeat new password");
                return;
            }
        }
        try {
            const response = await updateUser(user);
            if(response.status == 200) {
                setEdit(false);
                setAction(1 - action);
                alert("User's data updated successfully.")
            }
        }
        catch (error) {
            console.error('Error fetching data: ', error);
            alert("Data invalid: please check the password");
        }
    }

    const handleEdit = (index: number) => {
        setEdit(true);
        setUser(users[index])
    }

    const handleView = (index: number) => { // INCOMPLETE
        alert(users[index].name)
    }
    

    const handleDelete = (index: number) => { // INCOMPLETE
        alert(users[index].name)
    }

    const handleClose = () => {
        setEdit(false);
    }

    return (
        <div className='w-full bg-gray-300'>
            <Menu />
            <div className='md:grid md:grid-cols-7 mx-10 my-5 flex items-center'>
                <div className='col-span-3 mb-20 mr-14'>
                    <UserCard
                        name='Users'
                        user={admin}
                        onSubmit={handleUpdateMyInfo}
                    />
                </div>
                <div className='col-span-4'>
                    <Table<User>
                        data={users}
                        columns={columns}
                        enableNumberPagination={true}
                        header={true}
                        pagination={6}
                        onDelete={handleView}
                        onEdit={handleEdit}
                        onView={handleDelete}
                    />
                </div>
            </div>
            {edit && (
                <FormUser
                    data={user}
                    onSubmit={handleUpdate}
                    onClose={handleClose}
                    password={user.email === admin.email}
                />
            )}
        </div>
    );
};

export default UserManagement;
