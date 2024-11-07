import axios, { AxiosResponse } from 'axios';
import { URL_BACKEND } from '../configs/config';

export const getTopics = async () => {
    try {
        const response: AxiosResponse = await axios.get(`${URL_BACKEND}/topic`);
        return response.data;
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
        else {
            console.log("Something went wrong");
        }
    }
}
