
import { apiRunner as api } from '../session/interceptor';

export const uploadFiles = async (input: File, output: File, problemId: number) => {
    const formData = new FormData();
    formData.append(`inputs`, input);
    formData.append(`outputs`, output);
    formData.append(`problem_id`, problemId.toString());

    try {
        const response = await api.post('/testCases/uploadTests', formData);
        return response;
    } catch (error) {
        console.error('Error fetching upload files:', error);
    }
};

export const downloadFiles = async (problemId: number) => {
    try {
        const response = await api.get('/testCases/downloadTests', {
            params: {
                problem_id: problemId,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching upload files:', error);
    }
};
