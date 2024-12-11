import { FC, useEffect, useState } from 'react';
import Menu from '../../components/Menu';
import { Submission as SubmissionInterface } from '../../utils/interfaces';
import Table from '../../components/Table';
import { useNavigate, useParams } from 'react-router-dom';
import CodeView from '../../components/CodeView';
import { getById } from '../../fetch/SubmissionFetch';
import { getUser } from '../../fetch/UserFetch';

const SubmissionView: FC = () => {
    const { id } = useParams();
    const [submission, setSubmission] = useState<SubmissionInterface>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [fileData, setFileData] = useState<{ language: string; code: string } | null>(null);
    const navigate = useNavigate();


    const columns = [
        { label: "Id", key: "id" },
        { label: "When", key: "executionDate" },
        { label: "Nickname", key: "nicknameUser" },
        { label: "Problem", key: "problemName" },
        { label: "Veredict", key: "veredict" }
    ];

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const idSubmission = id !== undefined ? id : "";
                const response = await getById(idSubmission);
                const responseUser = await getUser(undefined, response?.data.userId);
                const user = responseUser.data.user;
                const submission_answer:SubmissionInterface = response?.data;
                submission_answer.nicknameUser = user.nickname;
                setFileData({
                    language: "cpp",
                    code: response?.data.code_string
                });
                setSubmission(response?.data);
                setIsLoading(false);
            }
            catch (error) {
                console.error('Error fetching data: ', error);
            }
        }
        if (id) {
            fetchTopics();
        }
        else {
            navigate('/submissions')
        }
    }, [id, navigate]);

    if (isLoading) {
        return (
            <div className='bg-gray-300 w-screen'>
                <Menu />
                Loading...
            </div>
        );
    }
    return (
        <div className='w-full bg-gray-300'>
            <Menu></Menu>
            <div className='px-6 text-stroke font-Jomhuria md:text-8xl'>
                Submission
            </div>
            <div className='flex items-center justify-center pb-6 px-10'>
                {submission && (
                    <Table<SubmissionInterface>
                        columns={columns}
                        data={[submission]}
                        header={true}
                        pagination={1}
                        enableNumberPagination={false}
                        activePagination={false}
                    />
                )}
            </div>
            <div className='px-6'>
                <h1 className='text-lg'>Source Code</h1>
            </div>
            <div className='m-5 px-20'>
                {fileData && (
                    <CodeView
                        code={fileData.code}
                        language={`language-${fileData.language}`}
                    />
                )}
            </div>
        </div>
    );
};

export default SubmissionView;