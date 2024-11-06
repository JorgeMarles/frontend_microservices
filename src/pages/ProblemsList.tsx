import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import { Problem } from '../utils/problem_structure';
import Table from '../components/Table';

import data_problems from '../data/problems.json';

const ProblemList : FC = () => {
    const [problems, setProblems] = useState<Problem[]>(data_problems)
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                // const response = await axios.get();
                // setProblems(response.data);
            }
            catch (error) {
                console.error('Error fetching data: ', error);
            }
        }

        fetchData();
    }, []);

    return (
        <>
            <Table
                title='Problems'
                data={problems}
            />
        </>
    );
};

export default ProblemList;