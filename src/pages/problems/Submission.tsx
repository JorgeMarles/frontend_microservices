import { FC, useEffect, useState } from 'react';
import Menu from '../../components/Menu';
import { Submission as SubmissionInterface } from '../../utils/interfaces';
import Table from '../../components/Table';
import { useNavigate } from 'react-router-dom';
import { getIdUser } from '../../session/Token';
import { getAll, getAllByUser } from '../../fetch/SubmissionFetch';

const Submission: FC = () => {
    const [submissions, setSubmissions] = useState<SubmissionInterface[]>([]);
    const [isChecked, setIsChecked] = useState(false);
    const navigate = useNavigate();

    const columns = [
        { label: "Id", key: "id" },
        { label: "When", key: "executionDate" },
        // { label: "Nickname", key: "nickname" },
        { label: "Problem", key: "problemName" },
        { label: "Veredict", key: "veredict" }
    ];

    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                if (isChecked) {
                    const response = await getAllByUser(getIdUser());
                    console.log(response?.data);
                    setSubmissions(response?.data);
                }
                else {
                    const response = await getAll();
                    console.log(response?.data);
                    setSubmissions(response?.data);
                }

            }
            catch (error) {
                console.error('Error fetching data: ', error);
            }
        }

        fetchSubmissions();
    }, [isChecked]);

    const handleViewDetails = (index: number) => {
        navigate(`/submission/${submissions[index].id}`);
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
                    activePagination={true}
                />
            </div>
        </div>
    );
};

export default Submission;