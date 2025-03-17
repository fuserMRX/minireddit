'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/components/ui/input';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { SearchSchema } from '@/lib/validations';
// import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils';
// import GlobalResult from '@/components/shared//search/GlobalResult';

const GlobalRedditSearch = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const searchContainerRef = useRef<HTMLDivElement | null>(null);
    const listenerAdded = useRef(false); // Ref to track listener

    // const query = searchParams.get('q') || '';
    // const globalQuery = searchParams.get('global') || '';

    const [search, setSearch] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    // const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<z.infer<typeof SearchSchema>>({
        resolver: zodResolver(SearchSchema),
        defaultValues: {
            querySearch: '',
        },
    });

    const handleSearch = async (values: z.infer<typeof SearchSchema>) => {
        try {
            // await createAnswer({
            //     content: values.answer,
            //     author: JSON.parse(authorId),
            //     question: JSON.parse(questionId),
            //     path: pathname,
            // });

            form.reset();

            // if (editorRef.current) {
            //     // @ts-ignore
            //     // { format: 'html', no_events: true } => prevents validation trigger after cleaning the content
            //     editorRef.current.setContent('', {
            //         format: 'html',
            //         no_events: true,
            //     });
            // }
        } catch (error) {
            console.error(error);
        }
    };

    // useEffect(() => {
    //     const handleOutsideClick = (e: MouseEvent) => {
    //         if (
    //             searchContainerRef.current &&
    //             !searchContainerRef.current.contains(e.target as Node)
    //         ) {
    //             setSearch('');
    //         }
    //     };

    //     // Only add the listener if it hasn't been added already
    //     if (!listenerAdded.current) {
    //         document.addEventListener('click', handleOutsideClick);
    //         listenerAdded.current = true; // Mark listener as added
    //     }

    //     return () => {
    //         document.removeEventListener('click', handleOutsideClick);
    //         listenerAdded.current = false; // Reset listener tracking on cleanup
    //     };
    // }, [pathname]);

    // useEffect(() => {
    //     const delayDebounceFn = setTimeout(() => {
    //         if (search) {
    //             const newUrl = formUrlQuery({
    //                 params: searchParams.toString(),
    //                 key: 'global',
    //                 value: search,
    //             });

    //             router.push(newUrl, { scroll: false });
    //         } else {
    //             // Dont'd do local and global search at the same time
    //             // It means that local will stay active even after reloading the page
    //             // but global will be cleared if we clear the search input
    //             if (query) {
    //                 const newUrl = removeKeysFromQuery({
    //                     params: searchParams.toString(),
    //                     keysToRemove: ['global', 'type'],
    //                 });

    //                 router.push(newUrl, { scroll: false });
    //             }
    //         }
    //     }, 300);

    //     return () => clearTimeout(delayDebounceFn);
    // }, [search, searchParams, router, pathname, query]);

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSearch)}
                className='flex w-full items-center justify-center gap-1'
            >
                <div className=''>
                    <Button
                        type='submit'
                        variant='outline'
                        disabled={isSubmitting}
                        size='icon'
                    >
                        <Search />
                    </Button>
                </div>
                <FormField
                    control={form.control}
                    name='querySearch'
                    render={({ field }) => (
                        <FormItem className='relative w-full'>
                            <FormControl>
                                <Input
                                    type='text'
                                    minLength={1}
                                    maxLength={20}
                                    placeholder='Search globally'
                                    className='text-center bg-background placeholder:text-neutral-400'
                                    {...field}
                                />
                            </FormControl>
                            {/* <div className='pointer-events-none fixed top-16 right-0 left-0 h-5 bg-transparent sm:absolute sm:top-auto sm:-bottom-6 sm:bg-transparent'>
                                <FormMessage className='rounded bg-white/80 px-2 py-1 text-center text-xs text-red-500 sm:bg-transparent sm:p-0' />
                            </div> */}
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
};

export default GlobalRedditSearch;
