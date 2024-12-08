import axios from 'axios';
import { User, UserUpdatePassword } from '../utils/interfaces';
import { URL_BACKEND_USERS } from '../configs/config';

export const createUser = async (userData: User) => {
    try {
        const response = await axios.post(`${URL_BACKEND_USERS}/user`, userData);
        return response; 
    } catch (error) {
        console.error('Error creating user:', error);
        throw error; 
    }
};

export const updatePassword = async (userData: UserUpdatePassword) => {
    try {
        const response = await axios.put(`${URL_BACKEND_USERS}/user/recoveryPassword`, userData);
        return response; 
    } catch (error) {
        console.error('Error updating password:', error);
        throw error; 
    }
};

