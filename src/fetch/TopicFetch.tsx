import axios, { AxiosResponse } from 'axios';
import { URL_BACKEND_PROBLEMS } from '../configs/config';

export const getTopics = async () => {
    try {
        const response: AxiosResponse = await axios.get(`${URL_BACKEND_PROBLEMS}/topic`);
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
