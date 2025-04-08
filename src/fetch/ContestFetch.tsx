import { AxiosError, AxiosResponse } from "axios";
import { apiContests as api } from "../session/interceptor";
import { Contest, ContestDetails, ContestRanking } from "../utils/interfaces";

function convertDate(contest: Contest) {
  return {
    ...contest,
    start: new Date(contest.start),
  };
}

export const getContests = async () => {
  try {
    const response: AxiosResponse = await api.get("/contest");
    return response.data.map(convertDate) as Contest[];
  } catch (error) {
    console.error(error);

    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message);
    } else {
      throw error;
    }
  }
};

export const searchContests = async (query: string) => {
  try {
    const response: AxiosResponse = await api.get(`/contest?q=${query}`);
    return response.data.map(convertDate) as Contest[];
  } catch (error) {
    console.error(error);

    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message);
    } else {
      throw error;
    }
  }
};

export const getContestById = async (id: number) => {
  try {
    const response: AxiosResponse = await api.get(`/contest/${id}`);
    return convertDate(response.data) as ContestDetails;
  } catch (error) {
    console.error(error);

    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message);
    } else {
      throw error;
    }
  }
};

export const createContest = async (contest: ContestDetails) => {
  try {
    const response = await api.post("/contest", contest);
    return response.data;
  } catch (error) {
    console.error(error);

    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message);
    } else {
      throw error;
    }
  }
};

export const updateContest = async (contest: ContestDetails) => {
  try {
    const response = await api.put("/contest", contest);
    return response.data;
  } catch (error) {
    console.error(error);

    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message);
    } else {
      throw error;
    }
  }
};

export const deleteContest = async (id: number) => {
  try {
    const response = await api.delete(`/contest/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);

    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message);
    } else {
      throw error;
    }
  }
};

export const getContestRanking = async (id: number) => {
  try {
    const response: AxiosResponse = await api.get(`/contest/${id}/ranking`);
    return response.data as ContestRanking;
  } catch (error) {
    console.error(error);

    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message);
    } else {
      throw error;
    }
  }
};

export const enrollContest = async (id: number) => {
  try {
    const response: AxiosResponse = await api.post(`/contest/${id}/enroll`);
    return response.data;
  } catch (error) {
    console.error(error);

    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message);
    } else {
      throw error;
    }
  }
};

export const unenrollContest = async (id: number) => {
  try {
    const response: AxiosResponse = await api.delete(`/contest/${id}/enroll`);
    return response.data;
  } catch (error) {
    console.error(error);

    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message);
    } else {
      throw error;
    }
  }
};

export const submitContestProblem = async ({
  contestId,
  problemId,
  code,
}: {
  contestId: number;
  problemId: number;
  code: string;
}) => {
  try {
    const response: AxiosResponse = await api.post(
      `/contest/${contestId}/submit`,
      {
        problemId,
        code,
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);

    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message);
    } else {
      throw error;
    }
  }
};
