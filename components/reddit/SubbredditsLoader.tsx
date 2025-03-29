import { Skeleton } from '@/components/ui/skeleton';

const SubbredditsLoader = () => {
    return (
        <div className='my-4 rounded-lg border border-blue-100 shadow-md transition-shadow duration-300 hover:shadow-lg sm:min-w-sm md:min-w-md lg:min-w-lg dark:border-blue-900/30'>
            <div className='rounded-t-lg bg-gradient-to-r from-cyan-100 to-blue-200 p-4 dark:from-cyan-900/50 dark:to-blue-800/50'>
                <Skeleton className='mx-auto h-8 w-3/4 animate-pulse bg-white/50 dark:bg-white/10' />
            </div>
            <div className='bg-gradient-to-b from-blue-50 to-white p-4 dark:from-slate-900 dark:to-slate-800'>
                <div className='grid grid-cols-2 gap-2'>
                    {Array(8)
                        .fill(0)
                        .map((_, index) => (
                            <Skeleton
                                key={index}
                                className={`h-8 w-full animate-pulse rounded-md ${
                                    [
                                        'bg-blue-100/80',
                                        'bg-cyan-100/80',
                                        'bg-purple-100/80',
                                        'bg-emerald-100/80',
                                        'bg-amber-100/80',
                                        'bg-rose-100/80',
                                        'bg-fuchsia-100/80',
                                        'bg-lime-100/80',
                                    ][index % 8]
                                } dark:opacity-30`}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
};

export default SubbredditsLoader;
