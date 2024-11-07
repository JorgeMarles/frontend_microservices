import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import { Problem } from '../../utils/problem_structure';
import Table from '../../components/Table';

import data_problems from '../../data/problems.json';
import Card from '../../components/Card';
import Combobox from '../../components/Combobox';

// const topics = [ "string", "graphs", "Flow"];

const difficulty = [
    {
        id: 1,
        name: "easy"
    },
    {
        id: 2,
        name: "medium"
    },
    {
        id: 3,
        name: "hard"
    },
    {
        id: 4,
        name: "none"
    }
]

const ProblemList: FC = () => {
    const [problems, setProblems] = useState<Problem[]>(data_problems);
    const columns = ["Problem's name", "difficulty", "topic"];
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


    const handleFilter = (value: string | undefined) => {
        console.log(value);
    }

    return (
        <div className='bg-gray-300 w-full grid grid-cols-2 gap-4'>
            <div className='p-8'>
                <div className='flex justify-between'>
                    <h1 className='text-8xl text-stroke font-Jomhuria'>Problem list</h1>
                    <Combobox
                        data={difficulty}
                        onFilter={handleFilter}
                        title={'difficulty'}
                    />
                </div>
                <Table
                    data={problems}
                    columns={columns}
                />
            </div>
            <div className='mx-5 flex'>
                <div className="h-full w-1 bg-gray-500 "></div>
                <div className='pl-5 ml-5 w-full'>
                    <h1 className='font-Jomhuria text-7xl text-center'>
                        Topics
                    </h1>
                    <div className='grid grid-cols-2 gap-4'>
                        <Card name={"Strings"} />
                        <Card name={"Graphs"} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProblemList;