import { AxiosResponse } from 'axios';
import { apiProblems as api } from '../session/interceptor';
export const getTopics = async () => {
    try {
        const response: AxiosResponse = await api.get('/topic');
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
