import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { FC, useState } from 'react';

const Search: FC = () => {
    const [input, setInput] = useState("");
    const handleSubmit = () => {
        alert(input);
        setInput("");
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInput(value);
    }
    return (
        <form onSubmit={handleSubmit}>
            {/* flex flex-row items-center border border-black bg-white  w-64 mx-2 mb-2 */}
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
