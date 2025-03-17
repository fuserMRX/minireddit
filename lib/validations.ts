import { z } from 'zod';

export const SearchSchema = z.object({
    querySearch: z.string().min(1, 'Search must be at least 1 character').max(20, 'Title must be less than 20 characters'),
});