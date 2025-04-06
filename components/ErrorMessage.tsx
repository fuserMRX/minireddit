'use client';

import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorMessageProps {
    message?: string;
    onRetry?: () => void;
}

export function ErrorMessage({
    message = 'Failed to load Reddit posts',
    onRetry,
}: ErrorMessageProps) {
    return (
        <div
            className='bg-card border-destructive/30 ring-border flex flex-col items-center justify-center rounded-lg border-2 p-8 text-center shadow-md ring-1'
            data-testid='error-message'
        >
            <div className='relative mb-6 flex h-24 w-24 items-center justify-center'>
                <div className='bg-destructive/20 absolute h-full w-full animate-ping rounded-full opacity-25'></div>
                <AlertCircle
                    size={48}
                    className='text-destructive relative z-10'
                />
            </div>

            <h3 className='text-card-foreground mb-2 text-2xl font-bold'>
                Oops! Something went wrong
            </h3>

            <p className='text-muted-foreground mb-6 text-lg'>{message}</p>

            {onRetry && (
                <Button
                    onClick={onRetry}
                    variant='destructive'
                    className='group flex items-center gap-2'
                >
                    <RefreshCw className='h-4 w-4 transition-transform group-hover:rotate-180' />
                    <span>Try Again</span>
                </Button>
            )}

            <div className='text-muted-foreground mt-8 text-sm'>
                <p>
                    This could be due to API rate limiting or network issues.
                    <br />
                    Please try again in a few moments.
                </p>
            </div>
        </div>
    );
}
