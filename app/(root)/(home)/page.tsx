import type { Metadata } from 'next';
import { Counter } from '@/components/counter/Counter';

export default function IndexPage() {
    return <Counter />;
}

export const metadata: Metadata = {
    title: 'Home | Mini Reddit',
    description: 'Mini Reddit app',
};