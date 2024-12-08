import axios, { AxiosResponse } from 'axios';
import { URL_BACKEND_USERS } from '../configs/config';
import { User } from '../utils/interfaces';
import { useState } from 'react';

export const LoginSession = () => {
    const [success, setSuccess] = useState<boolean>(true);
    const loginUser = async (userData : User) => {
        try {
            const response: AxiosResponse = await axios.post(`${URL_BACKEND_USERS}/session/login`, userData);
            setSuccess(true);
            console.log(response.data)
            return response.data;
        } catch (error) {
            setSuccess(false);
            console.error('Error login a user:', error);
        }
    }
    return { loginUser, success };
}
