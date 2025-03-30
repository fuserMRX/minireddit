'use client';

import Link from 'next/link';
import Image from 'next/image';
import GlobalRedditSearch from '@/components/search/GlobalRedditSearch';
import Theme from '@/components/Theme';

export const Navbar = () => {
    return (
        <nav className='fixed z-50 w-full bg-card border-b border-border p-2 sm:p-3 font-bold transition-colors'>
            <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between max-w-[1920px] mx-auto'>
                {/* Row 1: Logo on left, Theme on right (for mobile) */}
                <div className='flex w-full items-center justify-between sm:w-auto'>
                    {/* Logo wrapped in a responsive container */}
                    <Link href='/' className='flex items-center'>
                        <Image
                            src='/assets/images/mini-reddit.svg'
                            width={200}
                            height={200}
                            alt='Mini Reddit'
                            className='h-auto w-full'
                            priority
                        />
                    </Link>

                    {/* Theme visible on mobile only */}
                    <div className='sm:hidden'>
                        <Theme />
                    </div>
                </div>

                {/* Row 2: Global search */}
                <div className='flex w-full justify-center sm:mx-4 sm:flex-1 max-w-xl'>
                    <GlobalRedditSearch />
                </div>

                {/* Theme visible on larger screens */}
                <div className='hidden sm:block'>
                    <Theme />
                </div>
            </div>
        </nav>
    );
};
