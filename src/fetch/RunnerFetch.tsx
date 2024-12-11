
import { apiRunner as api} from '../session/interceptor';


export const downloadFiles = async (problemId: number) => {
    try {
        const response = await api.get('/testCases/downloadTests', {
            params: {
                problem_id: problemId,
            },
        });
        return response;
    } catch (error) {
        console.error('Error fetching upload files:', error);
    }
};

