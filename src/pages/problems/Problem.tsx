import { FC, useEffect, useState } from 'react';
import Menu from '../../components/Menu';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import ProblemView from '../../components/ProblemView';
import { field_problem } from '../../utils/field';
import { Problem as ProblemInterface, Submission } from '../../utils/interfaces';
import { getByID } from '../../fetch/ProblemFetch';
import { problem as emptyProblem } from '../../utils/emptyEntities';
import FileCard from '../../components/cards/FileCard';

import { getAllByProblemUser, runSubmission } from '../../fetch/SubmissionFetch';
import { getIdUser } from '../../session/Token';

const Problem: FC = () => {
    const { id } = useParams();
    const [data, setData] = useState<ProblemInterface>(emptyProblem);
    const [submissions, setSubmissions] = useState<Submission[]>();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProblem = async () => {
            try {
                const idProblem = id !== undefined ? parseInt(id) : 0;
                const response = await getByID(idProblem);
                const responseSubmission = await getAllByProblemUser(getIdUser(), idProblem);
                setData(response.problem);
                console.log(responseSubmission?.data);
                setSubmissions(responseSubmission?.data);
            }
            catch (error) {
                console.error('Error fetching data: ', error);
            }
        }
        fetchProblem();
    }, [id]);

    const handleEdit = (problem: ProblemInterface) => {
        navigate(`/createProblem/${problem.id}`);
    }

    const handleSendSubmission = async (file: File, state?: boolean) => {
        try {
            setLoading(true);
            const id = data.id ? data.id : 0;
            const isPublic = state ? state : true;
            const response = await runSubmission(file, id, getIdUser(), isPublic);
            if (response?.status == 200) {
                navigate(`/submission/${response.data.submission_id}`)
            }
        }
        catch (error) {
            console.error('Error fetching data: ', error);
        }
        finally {
            setLoading(false);
        }
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
                            textSubmit='Submit'
                        />
                        <div className='py-5'>
                            <div className='bg-red-700 w-full border border-black'>
                                <h1 className='text-stroke font-Jomhuria text-6xl px-5 pt-2'>Status</h1>
                            </div>
                            {submissions && submissions.map((item, key) =>
                                <div className='grid grid-cols-2 border-l border-r border-b border-black' key={key}>
                                    <NavLink
                                        to={`/submission/${item.id}`}
                                        className="text-blue-800 text-center border-r border-black"
                                    >
                                        {item.id}
                                    </NavLink>
                                    <div className="text-center text-lg capitalize">
                                        {item.veredict}
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
            {loading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-800 border-solid"></div>
                </div>
            )}
        </div>
    );
};

export default Problem;