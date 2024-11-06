import { FC } from 'react';
import { logoCompetitivaURL, logoIngSistemasURL, logoSiluxURL, logoUFPSURL } from '../assets/Images';

const Footer: FC = () => {
    return (
        <footer className='flex flex-col bg-red-700'>
            <div className='flex items-center md:justify-center justify-evenly'>
                <img src={logoUFPSURL} className='my-3 md:mx-16 w-20 h-16'></img>
                <div className="h-12 w-1 bg-white mr-2"></div>
                <img src={logoCompetitivaURL} className='my-3 md:mx-16 w-14 h-14'></img>
                <div className="h-12 w-1 bg-white mr-2"></div>
                <img src={logoIngSistemasURL} className='my-3 md:mx-16 w-12 h-16'></img>
                <div className="h-12 w-1 bg-white mr-2 "></div>
                <img src={logoSiluxURL} className='my-3 md:mx-16 w-24 h-12'></img>
            </div>
            <div className='bg-red-900 p-2'>
                <p className='text-white text-center text-sm'>
                    © Copyright Training Center. All Rights Reserved
                </p>
            </div>
        </footer>
    );
};

export default Footer;
