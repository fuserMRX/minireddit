import { z } from 'zod';

export const SearchSchema = z.object({
    querySearch: z.string().max(20, 'Title must be less than 20 characters'),
});