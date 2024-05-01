import { Country } from '@/types/general';
import cpf from './cpf';

const brazil = {
    code: 'br',
    name: 'Brazil',
    documents: {
        cpf,
    },
} satisfies Country;

export default brazil;
