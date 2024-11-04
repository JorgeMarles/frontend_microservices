import { FC } from 'react';
import image from '../images/logo.png';

const Header: FC = () => {
    return (
        <header className = 'flex bg-red-700 items-center'>
            <img src={image} className='m-3 w-20 h-8'></img>
            <div className="border border-black h-12 w-1 bg-white mr-2"></div>
            <h1 className='text-6xl text-stroke font-Jomhuria'>Training and Judge Center</h1>
        </header>
    );
};

export default Header;
