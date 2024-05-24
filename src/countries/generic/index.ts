import { Country } from '@/types/general';
import GenericDocument from './generic';

const generic = {
    code: 'generic',
    name: 'generic',
    documents: {
        generic: GenericDocument,
    },
} satisfies Country;

export default generic;
