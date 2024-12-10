import { FC, useEffect, useState } from 'react';
import Menu from '../../components/Menu';
import { useNavigate, useParams } from 'react-router-dom';
import ProblemView from '../../components/ProblemView';
import { field_problem } from '../../utils/field';
import { Problem as ProblemInterface } from '../../utils/interfaces';
import { getByID } from '../../fetch/ProblemFetch';
import { problem } from '../../utils/emptyEntities';
import FileCard from '../../components/cards/FileCard';

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

    const handleSendSubmission = (file: File, share?: boolean) => {
        alert(`subiendo ${file.name} : ${share}`);
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
                    <div className='w-full p-5'>
                        <FileCard
                            onSubmit={handleSendSubmission}
                            type=".cpp"
                            share={true}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Problem;