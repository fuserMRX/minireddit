import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const RedditPostsReduxLoader = () => {
    return (
        <div className='w-full space-y-6'>
            {/* Generate multiple post card skeletons */}
            {Array(5)
                .fill(0)
                .map((_, index) => (
                    <div
                        key={index}
                        className='my-4 w-full rounded-lg border border-blue-100 bg-gradient-to-r from-slate-50 to-white p-4 shadow-md transition-all duration-300 hover:shadow-lg sm:min-w-sm md:min-w-2xl lg:max-w-7xl lg:min-w-5xl dark:from-slate-900 dark:to-slate-800'
                    >
                        {/* Card header with voting and title */}
                        <div className='relative mb-4 flex flex-row items-center justify-between px-6'>
                            <div className='flex flex-col items-center gap-4 rounded-md bg-blue-50/40 px-2 py-2 dark:bg-blue-900/20'>
                                <Skeleton className='h-6 w-6 animate-pulse rounded-full bg-blue-200/70 dark:bg-blue-700/50' />
                                <Skeleton className='h-4 w-4 bg-blue-100/70 dark:bg-blue-800/50' />
                                <Skeleton className='h-6 w-6 animate-pulse rounded-full bg-blue-200/70 dark:bg-blue-700/50' />
                            </div>
                            <Skeleton className='mx-4 h-6 flex-1 animate-pulse bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-cyan-900/40 dark:to-blue-900/40' />
                        </div>

                        {/* Card content - post text */}
                        <div className='relative mb-4'>
                            <Skeleton className='mb-4 h-24 w-full animate-pulse bg-gradient-to-br from-slate-100 to-blue-50 dark:from-slate-800 dark:to-blue-900/30' />
                        </div>

                        {/* Media area */}
                        <div className='relative mb-4 aspect-[16/9] w-full overflow-hidden rounded-md'>
                            <Skeleton className='h-full w-full animate-pulse bg-gradient-to-tr from-cyan-50 via-blue-50 to-purple-50 dark:from-cyan-900/30 dark:via-blue-900/30 dark:to-purple-900/30' />
                        </div>

                        {/* Card footer */}
                        <div className='flex flex-col items-start gap-4 border-t border-blue-50 px-4 pt-4 sm:flex-row sm:items-center sm:justify-between dark:border-blue-900/30'>
                            <div className='flex w-full items-center gap-2 sm:w-auto'>
                                <Skeleton className='h-10 w-10 animate-pulse rounded-full bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/40 dark:to-blue-900/40' />
                                <Skeleton className='h-4 w-24 bg-blue-100/70 dark:bg-blue-900/30' />
                                <Skeleton className='ml-2 h-4 w-32 bg-cyan-100/70 dark:bg-cyan-900/30' />
                            </div>

                            <div className='flex w-full justify-between gap-4 sm:w-auto sm:justify-end'>
                                <Skeleton className='h-4 w-20 bg-blue-100/70 dark:bg-blue-900/30' />
                                <Skeleton className='h-4 w-24 bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-cyan-900/40 dark:to-blue-900/40' />
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default RedditPostsReduxLoader;
