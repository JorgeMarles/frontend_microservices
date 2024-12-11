import { apiProblems as api } from '../session/interceptor';

export const runSubmission = async (code: File, problemId: number, userId: number, isPublic: boolean) => {
  const formData = new FormData();
  console.log(code)
  console.log(problemId)
  console.log(userId)
  console.log(isPublic)
  formData.append(`code`, code);
  formData.append(`user_id`, userId.toString());
  formData.append(`problem_id`, problemId.toString());
  formData.append(`is_public`, isPublic.toString());
  try {
    console.log(formData);
    const response = await api.post('/problem/run', formData);
    return response.data;
  } catch (error) {
    console.error('Error fetching problems:', error);
  }
};
