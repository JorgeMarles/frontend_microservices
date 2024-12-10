import { FC, useEffect, useState } from 'react';
import { Fields } from '../../utils/field';
import Combobox from '../Combobox';
import { Problem, Topic } from '../../utils/interfaces';
import { getTopics } from '../../fetch/TopicFetch';
import difficulties from '../../data/difficulties.json';
import { EyeIcon } from '@heroicons/react/24/outline';

interface ProblemProps {
    data: Problem;
    fields: Fields;
    onSubmit: (data: Problem) => void;
    onView: (data: Problem) => void;
}

const ProblemForm: FC<ProblemProps> = ({ data, fields, onSubmit, onView }) => {
    const [formData, setFormData] = useState<Problem>(data);
    const [topics, setTopics] = useState<Topic[]>([]);
    const [selectedTopic, setSelectedTopic] = useState<string>(
        data?.topic?.name ?? "Introductory problems"
    );
    const [difficultySelected, setDifficultySelected] = useState<string>(data.difficulty || "easy");

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const response = await getTopics();
                const values: Topic[] = Object.values(response.topics);
                setTopics(values);
                setSelectedTopic("Introductory problems");
                handleChangeDifficulty(difficultySelected);
            }
            catch (error) {
                console.error('Error fetching data: ', error);
            }
        }
        fetchTopics();
    }, []);

    useEffect(() => {
        handleChangeTopic(selectedTopic);
    }, [topics]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleChangeTopic = (value: string) => {
        for (const topic of topics) {
            if (topic.name === value) {
                setFormData({
                    ...formData,
                    ["topic_id"]: topic.id
                });
            }
        }
        setSelectedTopic(value);
    }

    const handleChangeDifficulty = (value: string) => {
        setFormData({
            ...formData,
            ["difficulty"]: value
        });
        setDifficultySelected(value);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleView = () => {
        onView(formData);
    }

    return (
        <form onSubmit={handleSubmit} className='flex flex-col items-center m-5 p-3'>
            <div className='grid grid-cols-10 gap-4 pb-5 flex w-full'>
                <div key={"name"} className="flex-grow col-span-4">
                    <input
                        className='p-2 outline-none w-full'
                        type={"text"}
                        name={"name"}
                        onChange={handleChange}
                        placeholder={"Problem's name"}
                        value={formData.name}
                        required
                    />
                </div>
                <div className='col-span-3'>
                    <Combobox
                        data={topics}
                        onChange={handleChangeTopic}
                        defaultName={selectedTopic}
                    />
                </div>
                <div className='col-span-2'>
                    <Combobox
                        data={difficulties.slice(1)}
                        onChange={handleChangeDifficulty}
                        defaultName={difficultySelected}
                    />
                </div>
                <div className='flex items-center justify-center'>
                    <button type="button" onClick={() => handleView()}>
                        <EyeIcon className="h-8 w-8 text-blue-900 " />
                    </button>
                </div>
            </div>
            {Object.keys(fields).map(key => (
                <div key={key} className="w-full">
                    {key === "example_input" && (
                        <h1 className='font-Jomhuria text-7xl'>
                            Example
                        </h1>
                    )}
                    <div className='flex items-center justify-between'>
                        <div className='font-Jomhuria text-5xl'>
                            {key === "example_input"
                                ? "Input"
                                : key === "example_output"
                                    ? "Output"
                                    : fields[key].name.charAt(0).toUpperCase() + fields[key].name.slice(1)}
                        </div>
                    </div>
                    <textarea
                        className='p-2 w-full outline-none'
                        rows={fields[key].name === "statement" ? 10 : 5}
                        id={key}
                        name={fields[key].name}
                        onChange={handleChange}
                        value={typeof formData[key as keyof Problem] === "string"
                            ? (formData[key as keyof Problem] as string)
                            : ""}
                        required
                    />
                </div>
            ))}
            <div className='flex items-center justify-center'>
                <button type="submit" className='rounded-full bg-gray-400 m-1 px-5 py-2 text-black hover:text-black hover:bg-white border border-black '>
                    Submit
                </button>
            </div>
        </form>
    );
};

export default ProblemForm;
