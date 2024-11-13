import axios, { AxiosResponse } from 'axios';
import { URL_BACKEND } from '../configs/config';
import { User_login } from '../utils/interfaces';
import { useState } from 'react';

export const LoginSession = () => {
    const [success, setSuccess] = useState<boolean>(true);
    const loginUser = async (userData : User_login) => {
        try {
            const response: AxiosResponse = await axios.post(`${URL_BACKEND}/session/login`, userData);
            setSuccess(true);
        } catch (error) {
            setSuccess(false);
            console.error('Error login a user:', error);
        }
    }
    return { loginUser, success };
}
