import { Country } from '@/types/general';
import ssn from './ssn';

const us = {
    code: 'US',
    name: 'United States',
    documents: {
        SSN: ssn,
    },
} satisfies Country;

export default us;
