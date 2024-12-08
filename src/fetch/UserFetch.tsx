import axios from 'axios';
import { User } from '../utils/interfaces';
import { URL_BACKEND_USERS } from '../configs/config';

export const Create = () => {
    const createUser = async (userData : User) => {
        try {
            await axios.post(`${URL_BACKEND_USERS}/user`, userData);
        } catch (error) {
            console.error('Error creating user:', error);
        }
    }
    return { createUser };
}
