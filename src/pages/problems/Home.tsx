import { FC, useEffect, useState } from 'react';
import { Problem } from '../../utils/interfaces';
import Table from '../../components/Table';
import Card from '../../components/cards/Card';
import Combobox from '../../components/Combobox';
import { Topic } from '../../utils/interfaces';
import { getTopics } from '../../fetch/TopicFetch';
import { getProblems } from '../../fetch/ProblemFetch';
import difficulties from '../../data/difficulties.json';
import Menu from '../../components/Menu';
import { iota } from '../../utils/services';
import Pagination from '../../components/Pagination';
import { useNavigate } from 'react-router-dom';

const addFormatSubmissions = (values: Problem[]) => {
    for (let i = 0; i < values.length; i++) {
        values[i].acceptedSubmissions = 500;
        values[i].totalSubmissions = 800;
        values[i].submissions = values[i].acceptedSubmissions + "/" + values[i].totalSubmissions;
    }
}

const pagination = 6;

const Home: FC = () => {
    const navigate = useNavigate();
    const [problems, setProblems] = useState<Problem[]>([]);
    const [topics, setTopics] = useState<Topic[]>([]);
    const [topicSelected, setTopicSelected] = useState("Introductory problems");
    const [difficultySelected, setDifficultySelected] = useState<string | undefined>(undefined);
    const [indexes, setIndexes] = useState<number[]>(iota(0, pagination));
    const [page, setPage] = useState(0);
    const columns = [
        { label: "Problem's name", key: "name" },
        { label: "Difficulty", key: "difficulty" },
        { label: "Submissions", key: "submissions" },
        // { label: "Topic", key: "topic.name" }
    ];

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const response = await getTopics();
                const values: Topic[] = Object.values(response.topics);
                const size = values.length;
                for (let i = 1; i < size; ++i) {
                    if (values[i].name == topicSelected) {
                        [values[0], values[i]] = [values[i], values[0]];
                    }
                }
                setTopics(values);
            }
            catch (error) {
                console.error('Error fetching data: ', error);
            }
        }

        fetchTopics();
    }, []);

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                const response = await getProblems(topicSelected, difficultySelected);
                const values: Problem[] = Object.values(response.problems);
                addFormatSubmissions(values);
                setProblems(values);
            }
            catch (error) {
                console.error('Error fetching data: ', error);
            }
        }

        fetchProblems();
    }, [topicSelected, difficultySelected]);


    const handleChangeTopic = (value: string) => {
        setTopicSelected(value);
    }

    const handleChangeDifficulty = (value: string | undefined) => {
        if (value === "none")
            value = undefined;
        setDifficultySelected(value);
    }

    const handleChangeProblem = (index: number) => {
        navigate(`/problem/${problems[index].id}`);
    };    

    const handlePagination = (newPage: number) => {
        const start = newPage * pagination, end = Math.min(topics.length, newPage * pagination + pagination);
        setPage(newPage);
        setIndexes(iota(start, end));
    }

    return (
        <div className='bg-gray-300'>
            <Menu></Menu>
            <div className='w-full grid grid-cols-2 gap-4 my-5'>
                <div className='p-8'>
                    <div className='lg:flex lg:items-center lg:justify-between pb-3'>
                        <h1 className='text-8xl text-stroke font-Jomhuria'>{topicSelected}</h1>
                        <div className='flex justify-center'>
                            <Combobox
                                data={difficulties}
                                onChange={handleChangeDifficulty}
                                defaultName={difficulties[0].name}
                            />
                        </div>
                    </div>
                    <Table<Problem>
                        data={problems}
                        columns={columns}
                        header={false}
                        onChange={handleChangeProblem}
                        pagination={5}
                        enableNumberPagination={true}
                    />
                </div>
                <div className='mx-5 flex'>
                    <div className="h-full w-1 bg-gray-500 "></div>
                    <div className='pl-5 ml-5 w-full h-full'>
                        <h1 className='font-Jomhuria text-7xl text-center'>
                            Topics
                        </h1>
                        <div className=''>
                            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-7'>
                                {indexes.map((index) => {
                                    if (!topics[index]) return null;
                                    return (
                                        <Card key={index} name={topics[index].name} onClick={handleChangeTopic} isSelected={topics[index].name == topicSelected} />
                                    )
                                })}
                            </div>
                        </div>
                        <Pagination
                            enableNumber={false}
                            page={page}
                            onPagination={handlePagination}
                            pagination={pagination}
                            size={topics.length}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;