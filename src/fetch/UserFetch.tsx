import axios from 'axios';
import { User_register } from '../utils/interfaces';
import { URL_BACKEND } from '../configs/config';

export const Create = () => {
    const createUser = async (userData : User_register) => {
        try {
            await axios.post(`${URL_BACKEND}/user`, userData);
        } catch (error) {
            console.error('Error creating user:', error);
        }
    }
    return { createUser };
}
