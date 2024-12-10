import { FC, useEffect, useState } from 'react';
import UserCard from '../../components/cards/UserCard';
import Menu from '../../components/Menu';
import { getEmailUser } from '../../session/Token';
import { disableUser, getUser, getUsers, updateUser } from '../../fetch/UserFetch';
import { User } from '../../utils/interfaces';
import Table from '../../components/Table';
import FormUser from '../../components/forms/FormUser';
import { user as emptyUser } from '../../utils/emptyEntities';
import { useNavigate } from 'react-router-dom';

const UserManagement: FC = () => {
    const [user, setUser] = useState<User>(emptyUser);
    const [admin, setAdmin] = useState<User>(emptyUser);
    const [users, setUsers] = useState<User[]>([]);
    const [edit, setEdit] = useState(false);
    const [action, setAction] = useState(0);
    const navigate = useNavigate();

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
        alert("If you update your information, you will be logged out.");
        setEdit(true);
        setUser(admin);
    }

    const handleUpdate = async (userUpdate: User) => {
        if ("newPassword" in userUpdate) {
            if ("repeatNewPassword" in userUpdate) {
                if (userUpdate.newPassword !== userUpdate.repeatNewPassword) {
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
            const response = await updateUser(userUpdate);
            if (response.status == 200) {
                setEdit(false);
                setAction(1 - action);
                alert("User's data updated successfully.")
                if (user === admin) {
                    console.log("algo");
                    sessionStorage.removeItem('token');
                    sessionStorage.removeItem('nickname');
                    navigate('/');
                }
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

    const handleView = (index: number) => {
        navigate(`/profile/${users[index].id}`);
    }

    const handleDelete = async (index: number) => {
        try {
            const response = await disableUser(users[index].email);
            if (response.status == 200) {
                setAction(1 - action);
                alert("User disabled successfully.")
            }
        }
        catch (error) {
            console.error('Error fetching data: ', error);
            alert("Data invalid: please check the password");
        }

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
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                        onView={handleView}
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
