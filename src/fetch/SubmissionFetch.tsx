import { apiProblems as api } from '../session/interceptor';

export const runSubmission = async (code: File, problemId: number, userId: number, isPublic: boolean) => {
  const formData = new FormData();
  formData.append(`code`, code);
  formData.append(`user_id`, userId.toString());
  formData.append(`problem_id`, problemId.toString());
  formData.append(`is_public`, isPublic.toString());
  try {
    const response = await api.post('/problem/run', formData);
    return response;
  } catch (error) {
    console.error('Error fetching problems:', error);
  }
};


export const getById = async (id: string) => {
  try {
    const response = await api.get('/submission/findOne', {
      params: {
        submission_id: id,
      },
    });
    return response;
  } catch (error) {
    console.error('Error fetching problems:', error);
  }
};



export const getAll = async () => {
  try {
    const response = await api.get('/submission/');
    return response;
  } catch (error) {
    console.error('Error fetching problems:', error);
  }
};


export const getAllByUser = async (userId: number) => {
  try {
    const response = await api.get('/submission/', {
      params: {
        user_id: userId,
      },
    });
    return response;
  } catch (error) {
    console.error('Error fetching problems:', error);
  }
};

