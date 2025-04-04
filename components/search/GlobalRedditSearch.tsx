'use client';

import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';

import {
    updateReddits,
    selectReddits,
    selectActiveSubreddit
} from '@/lib/redux/features/reddits/redditSlice';
import { Input } from '@/components/ui/input';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { SearchSchema } from '@/lib/validations';

const GlobalRedditSearch = () => {
    const dispatch = useAppDispatch();
    const allPosts = useAppSelector(selectReddits);
    const activeSubreddit = useAppSelector(selectActiveSubreddit);
    const [originalPosts, setOriginalPosts] = useState<typeof allPosts>([]);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [activeSubredditName, setActiveSubredditName] = useState<string>('');

    const form = useForm<z.infer<typeof SearchSchema>>({
        resolver: zodResolver(SearchSchema),
        defaultValues: {
            querySearch: '',
        },
    });

    // Update originalPosts whenever allPosts changes due to subreddit selection
    useEffect(() => {
        if ((originalPosts.length === 0) || (activeSubreddit !== activeSubredditName)) {
            setOriginalPosts(allPosts);
            setActiveSubredditName(activeSubreddit);
        }
    }, [allPosts, activeSubreddit, originalPosts.length, activeSubredditName]);

    // Reset form when subreddit changes
    useEffect(() => {
        form.reset({ querySearch: '' });
    }, [activeSubreddit, form]);

    const handleSearch = async (values: z.infer<typeof SearchSchema>) => {
        setIsSubmitting(true);

        try {
            // If search is empty, restore original posts directly from Redux store
            if (!values.querySearch.trim()) {
                dispatch(updateReddits(originalPosts));
            } else {
                // Filter posts based on search term
                const searchTerm = values.querySearch.toLowerCase();
                const filteredPosts = originalPosts.filter(post =>
                    post.data.title.toLowerCase().includes(searchTerm) ||
                    (post.data.selftext && post.data.selftext.toLowerCase().includes(searchTerm))
                );

                if (filteredPosts.length) {
                    dispatch(updateReddits(filteredPosts));
                }
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSearch)}
                className='flex w-full items-center justify-center gap-1'
                data-testid="search-results"
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
                                    maxLength={20}
                                    placeholder='Search in subreddit'
                                    className='text-center bg-background placeholder:text-neutral-400'
                                    data-testid="search-input"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
};

export default GlobalRedditSearch;
