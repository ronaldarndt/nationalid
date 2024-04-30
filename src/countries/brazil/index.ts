import { Country } from '@/types/general';
import cpf from './cpf';

const brazil = {
    code: 'BR',
    name: 'Brazil',
    documents: {
        CPF: cpf,
    },
} satisfies Country;

export default brazil;
