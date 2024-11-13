import { FC } from 'react';
import { Problem } from '../data/interfaces';

interface TableProps {
    data: Problem[];
    columns: string[];
}


const Table: FC<TableProps> = ({ data, columns }) => {

    return (
        <div className=''>
            <div className='grid grid-cols-3 gap-4 border-t-2 border-black p-4'>
                {columns.map((columna, index) => (
                    <div key={index} className='font-bold text-lg'>
                        {columna}
                    </div>
                ))}
            </div>
            {data.map((data, index) => (
                <div key={index} className='grid grid-cols-3 gap-4 border-t-2 border-black p-4'>
                    <div>
                        {data.name}
                    </div>
                    <div>
                        {data.difficulty}
                    </div>
                    <div>
                        {data.topic.name}
                    </div>
                </div>
            ))}
            <div className='border-t-2 border-black p-4'></div>
        </div>
    );
};

export default Table;