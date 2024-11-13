import { FC, useEffect, useState } from 'react';
import { Problem } from '../../data/interfaces';
import Table from '../../components/Table';
import Card from '../../components/Card';
import Combobox from '../../components/Combobox';
import { Topic } from '../../data/interfaces';
import { getTopics } from '../../fetch/TopicFetch';
import { getProblems } from '../../fetch/ProblemFetch';

const difficulty = [
    {
        id: 1,
        name: "easy"
    },
    {
        id: 2,
        name: "medium"
    },
    {
        id: 3,
        name: "hard"
    },
    {
        id: 4,
        name: "none"
    }
]

const Home: FC = () => {
    const [problems, setProblems] = useState<Problem[]>([]);
    const [topicSelected, setTopicSelected] = useState("Introductory problems");
    const columns = ["Problem's name", "difficulty", "topic"];
    const [topics, setTopics] = useState<Topic[]>([]);

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
                const response = await getProblems(topicSelected);
                const values: Problem[] = Object.values(response.problems);
                setProblems(values);
            }
            catch (error) {
                console.error('Error fetching data: ', error);
            }
        }

        fetchProblems();
    }, [topicSelected]);


    const handleFilter = (value: string | undefined) => {
        console.log(value);
    }

    const handleChooseTopic = (value: string) => {
        setTopicSelected(value);
    }

    return (
        <div className='bg-gray-300 w-full grid grid-cols-2 gap-4'>
            <div className='p-8'>
                <div className='flex justify-between'>
                    <h1 className='text-8xl text-stroke font-Jomhuria'>Problem list</h1>
                    {/* <Combobox
                        data={difficulty}
                        onFilter={handleFilter}
                        title={'difficulty'}
                    /> */}
                </div>
                <Table
                    data={problems}
                    columns={columns}
                />
            </div>
            <div className='mx-5 flex'>
                <div className="h-full w-1 bg-gray-500 "></div>
                <div className='pl-5 ml-5 w-full'>
                    <h1 className='font-Jomhuria text-7xl text-center'>
                        Topics
                    </h1>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                        {topics.map((topic, index) => (
                            <Card name={topic.name} onClick={handleChooseTopic} isSelected={topic.name == topicSelected}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;