import { Skeleton } from '@/components/ui/skeleton';

const SubbredditsLoader = () => {
    return (
        <div className='my-4 rounded-lg border border-border shadow-md transition-shadow duration-300 hover:shadow-lg bg-card'>
            <div className='rounded-t-lg bg-gradient-to-r from-cyan-50 to-blue-50 p-3 sm:p-4 pb-2 sm:pb-3 dark:from-gray-800 dark:to-gray-900'>
                <Skeleton className='mx-auto h-7 sm:h-8 md:h-9 w-3/4 animate-pulse bg-white/50 dark:bg-white/10' />
            </div>
            <div className='p-3 sm:p-4 md:p-5'>
                <div className='grid grid-cols-2 gap-2 md:gap-3 xl:gap-4'>
                    {Array(8)
                        .fill(0)
                        .map((_, index) => (
                            <Skeleton
                                key={index}
                                className={`h-7 sm:h-8 md:h-10 w-full animate-pulse rounded-md ${
                                    [
                                        'bg-blue-300 dark:bg-blue-700/40',
                                        'bg-cyan-300 dark:bg-cyan-700/40',
                                        'bg-purple-300 dark:bg-purple-700/40',
                                        'bg-emerald-300 dark:bg-emerald-700/40',
                                        'bg-amber-300 dark:bg-amber-700/40',
                                        'bg-rose-300 dark:bg-rose-700/40',
                                        'bg-fuchsia-300 dark:bg-fuchsia-700/40',
                                        'bg-lime-300 dark:bg-lime-700/40',
                                    ][index % 8]
                                } dark:bg-opacity-60`}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
};

export default SubbredditsLoader;
