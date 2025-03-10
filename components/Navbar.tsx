'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import GlobalRedditSearch from '@/components/search/GlobalRedditSearch';
import Theme from '@/components/Theme';

export const Navbar = () => {
    const pathname = usePathname();

    return (
        // <nav className='flex flex-col items-center justify-center bg-slate-300 p-3 sm:flex-row sm:justify-between font-bold'>
        //     <Link href='/' className='flex items-center justify-center'>
        //         <Image
        //             src='/assets/images/mini-reddit.svg'
        //             width={200}
        //             height={200}
        //             alt='Mini Reddit'
        //         />
        //     </Link>
        //     <GlobalRedditSearch />
        //     <Theme />
        // </nav>

        <nav className='w-full bg-slate-300 p-3 font-bold'>
            {/* We switch from flex-col on mobile to flex-row on sm: */}
            <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
                {/* Row 1 on mobile => (logo left, theme right).
            On large screens, we only keep the logo here. */}
                <div className='flex w-full items-center justify-between sm:w-auto'>
                    {/* Logo */}
                    <Link href='/' className='flex items-center'>
                        <Image
                            src='/assets/images/mini-reddit.svg'
                            width={200}
                            height={200}
                            alt='Mini Reddit'
                        />
                    </Link>

                    {/* Theme (shown on mobile only). Hidden at sm: and above. */}
                    <div className='sm:hidden'>
                        <Theme />
                    </div>
                </div>

                {/* Row 2 on mobile => search alone.
            On large screens => search is in the middle (flex-1). */}
                <div className='w-full sm:mx-4 sm:flex-1'>
                    <GlobalRedditSearch />
                </div>

                {/* Theme (hidden on mobile, shown on large screens). */}
                <div className='hidden sm:block'>
                    <Theme />
                </div>
            </div>
        </nav>
    );
};
