import { AxiosError, AxiosResponse } from "axios";
import { apiProblems as api } from "../session/interceptor";
import { Topic } from "../utils/interfaces";

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

export const deleteTopic = async (topic: Topic) => {
  try {
    const response = await api.delete("/topic", {
      data: topic,
    });
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
