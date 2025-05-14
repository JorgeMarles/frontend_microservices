import { AxiosError, AxiosResponse } from "axios";
import { apiStats as api } from "../session/interceptor";
import { StatsContest, StatsProblems } from "../utils/interfaces";

export const getContestStats = async (id: number) => {
  try {
    const response: AxiosResponse = await api.get(`/stats/${id}/contests`);

    return {
      total_contests: 0,
      ranking: [
        {
          id: 7,
          position: 1,
          percentile: 100,
        },
        {
          id: 6,
          position: 1,
          percentile: "100.00",
        },
        {
          id: 3,
          position: 1,
          percentile: "100.00",
        },
        {
          id: 2,
          position: 1,
          percentile: "50.00",
        },
        {
          id: 1,
          position: 1,
          percentile: "100.00",
        },
      ],
    } as StatsContest;

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

    return {
      total_problems: 10,
      accepted: 7,
      compilation_error: 1,
      wrong_answer: 1,
      time_limit_exceeded: 0,
      runtime_error: 1,
      average_attempts: 1.5,
      topics: [
        { id: 1, name: "Arrays", solved: 3 },
        { id: 2, name: "Strings", solved: 2 },
        { id: 3, name: "Math", solved: 2 },
      ],
    } as StatsProblems;
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
