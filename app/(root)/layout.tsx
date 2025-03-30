import React from 'react';
import { Navbar } from '@/components/Navbar';

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className='bg-background min-h-screen'>
            <Navbar />
            <div className='flex'>
                <section className='flex min-h-screen flex-1 px-4 pt-24 pb-6 max-md:pb-14 sm:px-8 md:px-10 lg:px-14'>
                    <div className='mx-auto w-full max-w-[1920px]'>{children}</div>
                </section>
            </div>
        </main>
    );
};

export default Layout;
