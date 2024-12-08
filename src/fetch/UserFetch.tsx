import axios from 'axios';
import { User } from '../utils/interfaces';
import { URL_BACKEND_USERS } from '../configs/config';

export const createUser = async (userData: User) => {
    try {
        const response = await axios.post(`${URL_BACKEND_USERS}/user`, userData);
        return response; // Devuelve la respuesta si la solicitud tiene éxito
    } catch (error) {
        console.error('Error creating user:', error);
        throw error; // Lanza el error para manejarlo desde el lugar donde se llama
    }
};