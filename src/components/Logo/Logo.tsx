import Link from 'next/link';
import Image from 'next/image';
import icon from '@/app/icon.png'

const Logo = () => {
    return (
        <Link href="/" className='flex items-end'>
            <Image src={icon} alt="AppleDealer" className='w-10' />
            <span className='ml-1 text-3xl font-medium leading-none'>Control</span>
        </Link>
    );
};

export default Logo;