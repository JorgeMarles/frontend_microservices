import axios from 'axios';
import { FC, useEffect, useState } from 'react';

interface Problem {
    id: number;
    name: string;
    topic: string;
}

const ProblemList : FC = () => {
    const [problems, setProblems] = useState<Problem[]>([])
    
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
            <h1>Hola mundo</h1>
        </>
    );
};

export default ProblemList;