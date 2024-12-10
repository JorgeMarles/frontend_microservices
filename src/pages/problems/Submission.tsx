import { FC, useEffect, useState } from 'react';
import Menu from '../../components/Menu';
import { Submission as SubmissionInterface } from '../../utils/interfaces';
import submissionsJSON from '../../data/submissions.json';
import Table from '../../components/Table';

const Submission: FC = () => {
    const [submissions, setSubmissions] = useState<SubmissionInterface[]>(submissionsJSON);
    const [isChecked, setIsChecked] = useState(false);

    const columns = [
        { label: "Id", key: "id" },
        { label: "When", key: "time_judge" },
        { label: "Nickname", key: "nickname" },
        { label: "Problem", key: "problem.name" },
        { label: "Veredict", key: "veredict" }
    ];

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                if (isChecked) {
                    setSubmissions([]);
                }
                else {
                    setSubmissions(submissionsJSON);
                }
                // const response = await getTopics();

            }
            catch (error) {
                console.error('Error fetching data: ', error);
            }
        }

        fetchTopics();
    }, [isChecked]);

    const handleViewDetails = (index: number) => {
        alert("imagina redireccion");
        console.log(submissions[index]);
    }

    const handleChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <div className='w-full bg-gray-300'>
            <Menu></Menu>
            <div className='flex justify-between mr-10'>
                <div className='px-6 text-stroke font-Jomhuria md:text-8xl'>
                    Status
                </div>
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="onlyUser"
                        checked={isChecked}
                        onChange={handleChange}
                        className="w-5 h-5 rounded-md border-gray-300 border-2 checked:bg-gray-700 bg-white border-2 border-gray-700 appearance-none"
                    />
                    <label htmlFor="onlyUser" className="ml-2 text-gray-800">
                        My only
                    </label>
                </div>
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