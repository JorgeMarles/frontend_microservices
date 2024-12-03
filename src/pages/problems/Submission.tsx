import { FC, useState } from 'react';
import Menu from '../../components/Menu';
import { Submission as SubmissionInterface } from '../../utils/interfaces';
import submissionsJSON from '../../data/submissions.json';
import Table from '../../components/Table';

const Submission: FC = () => {
    const [submissions, setSubmissions] = useState<SubmissionInterface[]>(submissionsJSON);
    const columns = [
        { label: "Id", key: "id" },
        { label: "When", key: "time_judge" },
        { label: "Nickname", key: "nickname" },
        { label: "Problem", key: "problem.name" },
        { label: "Veredict", key: "veredict" }
    ];

    const handleViewDetails = (index: number) => {
        alert("imagina redireccion");
        console.log(submissions[index]);
    }

    return (
        <div className='w-full bg-gray-300'>
            <Menu></Menu>
            <div className='px-6 outline-none w-full text-stroke font-Jomhuria md:text-8xl'>
                Status
            </div>
            <div className='flex items-center justify-center pb-6 px-10'>
                <Table<SubmissionInterface>
                    columns={columns}
                    data={submissions}
                    header={true}
                    onChange={handleViewDetails}
                    pagination={7}
                    enableNumberPagination={true}
                />
            </div>
        </div>
    );
};

export default Submission;