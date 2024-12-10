import { apiProblems as api } from '../session/interceptor';
import { Problem } from '../utils/interfaces';

export const getProblems = async (topicName?: string, difficulty?: string) => {
  try {
    const response = await api.get('/problem', {
      params: {
        difficulty,
        topic_name: topicName,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching problems:', error);
  }
};

export const create = async (problemData: Problem) => {
  try {
    const response = await api.post('/problem', problemData);
    return response;
  } catch (error) {
    console.error('Error creating problem:', error);
  }
};

export const uploadFiles = async (input: File, output: File, problemId: number) => {
  const formData = new FormData();
  formData.append(`inputs`, input);
  formData.append(`outputs`, output);
  formData.append(`problem_id`, problemId.toString());

  try {
      const response = await api.post('/problem/uploadTests', formData);
      return response;
  } catch (error) {
      console.error('Error fetching upload files:', error);
  }
};

export const update = async (problemData: Problem) => {
  try {
    const response = await api.put('/problem', problemData);
    return response;
  } catch (error) {
    console.error('Error updating problem:', error);
  }
};

export const getByID = async (idProblem: number) => {
  try {
    const response = await api.get('/problem', {
      params: {
        id: idProblem,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching problem by ID:', error);
  }
};

export const getProblemsInfo = async (id: number) => {
  try {
    const response = await api.get('/problem/user', {
      params: {
        id: id,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching problem by ID:', error);
  }
};

export const disableProblem = async (id: number) => {
  try {
    const response = await api.delete('/problem/', {
      data: {
        id: id,
      },
    });
    return response;
  } catch (error) {
    console.error('Error fetching problem by ID:', error);
  }
};
