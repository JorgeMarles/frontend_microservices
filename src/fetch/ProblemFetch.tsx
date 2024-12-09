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
    await api.post('/problem', problemData);
  } catch (error) {
    console.error('Error creating problem:', error);
  }
};

export const update = async (problemData: Problem) => {
  try {
    await api.put('/problem', problemData);
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
