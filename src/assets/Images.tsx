import { Cloudinary } from '@cloudinary/url-gen';
import { blur } from '@cloudinary/url-gen/actions/effect';
import { brightnessHSB } from '@cloudinary/url-gen/actions/adjust';

const cld = new Cloudinary({ cloud: { cloudName: 'ddsuc2uon' } });

const backgroundImage = cld.image('background-TJ');
backgroundImage.format('auto').quality('auto');
backgroundImage.effect(blur().strength(180)); 
backgroundImage.adjust(brightnessHSB().level(-50));

export const backgroundUrl = backgroundImage.toURL();

const logoImage = cld.image('logo');

export const logoUrl = logoImage.toURL();