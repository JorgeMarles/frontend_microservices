import axios, { AxiosResponse } from 'axios';
import { URL_BACKEND } from '../configs/config';
import { Problem } from '../utils/interfaces'

export const getProblems = async (topicName?: string, difficulty?: string) => {
    try {
        const response: AxiosResponse = await axios.get(`${URL_BACKEND}/problem`, {
            params: {
                difficulty: difficulty,
                topic_name: topicName
            }
        });
        return response.data;
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
        else {
            console.log("Something went wrong");
        }
    }
}

export const create = async (problemData : Problem) => {
    try {
        await axios.post(`${URL_BACKEND}/problem`, problemData);
    } catch (error) {
        console.error('Error creating problem:', error);
    }
    return create;
}


export const update = async (problemData : Problem) => {
    try {
        await axios.put(`${URL_BACKEND}/problem`, problemData);
    } catch (error) {
        console.error('Error creating problem:', error);
    }
    return create;
}

export const getByID = async (idProblem : number) => {
    try {
        const response: AxiosResponse = await axios.get(`${URL_BACKEND}/problem`, {
            params: {
                id: idProblem
            }
        });
        return response.data;
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
        else {
            console.log("Something went wrong");
        }
    }
}