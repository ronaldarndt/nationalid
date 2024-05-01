import { Country } from '@/types/general';
import ssn from './ssn';

const us = {
    code: 'us',
    name: 'United States',
    documents: {
        ssn,
    },
} satisfies Country;

export default us;
