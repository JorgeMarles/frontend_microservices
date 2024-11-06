import { FC } from 'react';
import { Problem } from '../utils/problem_structure';

interface TableProps {
    data: Problem[];
    title: string;
}


const Table: FC<TableProps> = ({ data, title }) => {

    return (
        <div className='p-2'>
            <div>
                <h1 className='text-8xl text-stroke font-Jomhuria'>{title}</h1>
            </div>
            {data.map(data => (
                <div className='flex'>
                    <div>
                        {data.name}
                    </div>
                    <div>
                        {data.difficulty}
                    </div>
                    <div>
                        {data.topic}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Table;