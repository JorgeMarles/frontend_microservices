import { FC } from 'react';
import Search from './Search';

const Menu: FC = () => {
    return (
        <nav className='m-5'>
            <ul className="flex flex-row items-center">
                <li className='px-8 border-r-4 border-gray-500 font-Jomhuria text-5xl'>
                    <a href="#" className="" aria-current="page">ProblemSet</a>
                </li>
                <li className='px-8 border-r-4 border-gray-500 font-Jomhuria text-5xl'>
                    <a href="#" className="" aria-current="page">Submissions</a>
                </li>
                <li className='px-8 border-r-4 border-gray-500 font-Jomhuria text-5xl'>
                    <a href="#" className="" aria-current="page">Ranking</a>
                </li>
                <li className='px-8 text-xl'>
                    <Search />
                </li>
            </ul>
        </nav>
    );
};

export default Menu;
