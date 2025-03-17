import React from 'react';
import { Navbar } from '@/components/Navbar';
import Toaster from '@/components/Toaster';

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className=''>
            <Navbar />
            <div className='flex'>
                <section className='flex min-h-screen flex-1 flex-col px-6 pt-36 pb-6 max-md:pb-14 sm:px-14'>
                    <div className='mx-auto w-full max-w-5xl'>{children}</div>
                </section>
                {/* <RightSideBar /> */}
            </div>

            <Toaster />
        </main>
    );
};

export default Layout;
