import axios from 'axios';
import { URL_BACKEND } from '../configs/config';
import { Problem_structure } from '../utils/problem_structure';

export const create = async (problemData : Problem_structure) => {
    try {
        await axios.post(`${URL_BACKEND}/problem`, problemData);
    } catch (error) {
        console.error('Error creating problem:', error);
    }
    return create;
}
