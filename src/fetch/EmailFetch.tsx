import axios from 'axios';
import { URL_BACKEND_USERS } from '../configs/config';
import { UserUpdatePassword } from '../utils/interfaces';


export const sendCode = async (userData : UserUpdatePassword) => {
    try {
        const response = await axios.post(`${URL_BACKEND_USERS}/user/sendCode`, userData);
        return response;
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
        else {
            console.log("Something went wrong");
        }
        throw error; 
    }
}