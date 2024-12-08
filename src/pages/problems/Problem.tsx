import { FC, useEffect, useState } from 'react';
import Menu from '../../components/Menu';
import { useNavigate, useParams } from 'react-router-dom';
import ProblemView from '../../components/ProblemView';
import { field_problem } from '../../utils/field';
import { Problem as ProblemInterface } from '../../utils/interfaces';
import { getByID } from '../../fetch/ProblemFetch';
import { problem } from '../../utils/emptyEntities';

const Problem: FC = () => {
    const { id } = useParams();
    const [data, setData] = useState<ProblemInterface>(problem);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProblem = async () => {
            try {
                const idProblem = id !== undefined ? parseInt(id) : 0;
                const response = await getByID(idProblem);
                setData(response.problem);
            }
            catch (error) {
                console.error('Error fetching data: ', error);
            }
        }
        fetchProblem();
    }, [id]);

    console.log(data)
    const handleEdit = (problem: ProblemInterface) => {
        navigate(`/createProblem/${problem.id}`);
    }
    return (
        <div className='bg-gray-300 w-full'>
            <Menu></Menu>
            <div className='grid grid-cols-3 gap-4'>
                <div className='col-span-2'>
                    <ProblemView
                        data={data}
                        fields={field_problem}
                        onView={handleEdit}
                    />
                </div>
                <div className='mx-5 flex'>
                    <div className="h-full w-1 bg-gray-500 mt-5"></div>
                    <div className='pl-5 ml-5 w-full'>
                        <h1 className='font-Jomhuria text-7xl text-center'>
                            Problem's files
                        </h1>
                        <div className='bg-white pb-5 px-8 m-5 rounded-2xl  border-2 border-black flex flex-col justify-center h-48'>
                            <h1 className='text-center'>Solution.cpp</h1>
                            <button className='rounded-full bg-gray-300 m-1 px-5 py-2 text-black hover:text-black hover:bg-gray-500 border border-black '>
                                Select file
                            </button>
                            <button className='rounded-full bg-gray-300 m-1 px-5 py-2 text-black hover:text-black hover:bg-gray-500 border border-black '>
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Problem;