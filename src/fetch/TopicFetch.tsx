import axios, { AxiosError, AxiosResponse } from "axios";
import { apiProblems as api } from "../session/interceptor";
import { Topic } from "../utils/interfaces";
import { URL_BACKEND_PROBLEMS } from "../configs/config";
export const getTopics = async () => {
  try {
    const response: AxiosResponse = await api.get("/topic");
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.log("Something went wrong");
    }
  }
};

export const createTopic = async (topic: Topic) => {
  try {
    const response = await api.post("/topic", topic);
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
