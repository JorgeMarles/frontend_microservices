import { AxiosError, AxiosResponse } from "axios";
import { apiStats as api } from "../session/interceptor";
import { StatsContest, StatsProblems } from "../utils/interfaces";

export const getContestStats = async (id: number) => {
  try {
    const response: AxiosResponse = await api.get(`/stats/${id}/contests`);

    return response.data as StatsContest;
  } catch (error) {
    console.error(error);

    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message);
    } else {
      throw error;
    }
  }
};

export const getProblemsStats = async (id: number) => {
  try {
    const response: AxiosResponse = await api.get(`/stats/${id}/problems`);

    return response.data as StatsProblems;
  } catch (error) {
    console.error(error);

    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message);
    } else {
      throw error;
    }
  }
};
