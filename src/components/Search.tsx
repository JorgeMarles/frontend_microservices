import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { FC, useState } from 'react';
import { getByName } from '../fetch/ProblemFetch';
import { useNavigate } from 'react-router-dom';

const Search: FC = () => {
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 
        try {
            const response = await getByName(input);
            if (response?.status === 200) {
                navigate(`/problem/${response.data.problem.id}`);
            } else {
                alert("Not found.");
            }
        } catch (error) {
            console.error(`Searching problem error: ${error}`);
        }
    };
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInput(value);
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className='flex flex-row items-center border border-black rounded-2xl bg-white lg:w-64 w-44 px-2'>
                <MagnifyingGlassIcon className='h-8 w-8 text-black' />
                <input
                    className='w-full outline-none rounded-2xl p-2'
                    type='text'
                    placeholder='Problem'
                    value={input}
                    onChange={handleChange}
                    required
                />
            </div>
        </form>
    );
};

export default Search;
