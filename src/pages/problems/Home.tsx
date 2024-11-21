import { FC, useEffect, useState } from 'react';
import { Problem } from '../../utils/interfaces';
import Table from '../../components/Table';
import Card from '../../components/Card';
import Combobox from '../../components/Combobox';
import { Topic } from '../../utils/interfaces';
import { getTopics } from '../../fetch/TopicFetch';
import { getProblems } from '../../fetch/ProblemFetch';
import difficulties from '../../data/difficulties.json';
import Menu from '../../components/Menu';


const Home: FC = () => {
    const [problems, setProblems] = useState<Problem[]>([]);
    const [topicSelected, setTopicSelected] = useState("Introductory problems");
    const [difficultySelected, setDifficultySelected] = useState<string | undefined>(undefined);
    const columns = [
        { label: "Problem's name", key: "name" },
        { label: "Difficulty", key: "difficulty" },
        { label: "Topic", key: "topic.name" }
    ];
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
                const response = await getProblems(topicSelected, difficultySelected);
                const values: Problem[] = Object.values(response.problems);
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

    return (
        <div className=''>
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
                                <Card key={index} name={topic.name} onClick={handleChangeTopic} isSelected={topic.name == topicSelected} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;