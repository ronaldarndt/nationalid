import { Document } from '@/types/general';

const generic = {
    code: 'generic',
    digits: Number.MAX_VALUE,
    mask: [],
    name: 'generic',
    format: (value: string) => value,
    formatPartial: (value: string) => value,
    validate: (_value: string) => true,
} satisfies Document;

export default generic;
