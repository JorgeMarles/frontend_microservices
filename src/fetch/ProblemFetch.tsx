import axios, { AxiosResponse } from 'axios';
import { URL_BACKEND } from '../configs/config';
import { Problem_structure } from '../data/problem_structure';
import {Problem } from '../data/Interfaces'

export const getProblems = async () => {
    try {
        const response: AxiosResponse = await axios.get(`${URL_BACKEND}/problem`);
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

export const create = async (problemData : Problem_structure) => {
    try {
        await axios.post(`${URL_BACKEND}/problem`, problemData);
    } catch (error) {
        console.error('Error creating problem:', error);
    }
    return create;
}
