import React from 'react';
import { Navbar } from '@/components/Navbar';

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className=''>
            <Navbar />
            <div className='flex'>
                <section className='flex min-h-screen flex-1 px-6 pt-24 pb-6 max-md:pb-14 sm:px-14'>
                    <div className='mx-auto max-w-max'>{children}</div>
                </section>
            </div>
        </main>
    );
};

export default Layout;
