import { Document } from '@/types/general';

const ssn = {
    code: 'ssn',
    digits: 9 as const,
    mask: [/\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/],
    name: 'Social Security Number',
    format: (value: string) => {
        return value
            .replaceAll(/[^\d]/g, '')
            .replace(/(\d{3})(\d{2})(\d{4})/, '$1-$2-$3');
    },
    formatPartial: (value: string) => {
        const normalized = value.replaceAll(/[^\d]/g, '');
        let result = [...normalized];

        if (result.length >= 3) result = result.toSpliced(3, 0, '-');

        if (result.length >= 6) result = result.toSpliced(6, 0, '-');

        return result.join('');
    },
    validate: (value: string) => {
        const normalized = value.replaceAll(/[^\d]/g, '');

        if (normalized.length !== 9) return false;

        const [firstPart, secondPart, thirdPart] = [
            normalized.slice(0, 3),
            normalized.slice(3, 5),
            normalized.slice(5, 9),
        ];

        if (
            firstPart === '000' ||
            firstPart === '666' ||
            firstPart.startsWith('9')
        )
            return false;

        if (secondPart === '00') return false;
        if (thirdPart === '0000') return false;

        return true;
    },
} satisfies Document;

export default ssn;
