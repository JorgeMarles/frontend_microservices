import { FC } from 'react';
import { logoUrl } from '../assets/Images';

const Header: FC = () => {
    return (
        <header className = 'flex bg-red-700 items-center'>
            <img src={logoUrl} className='m-3 w-20 h-8'></img>
            <div className="border border-black h-12 w-1 bg-white mr-2"></div>
            <h1 className='text-6xl text-stroke font-Jomhuria'>Training and Judge Center</h1>
        </header>
    );
};

export default Header;
