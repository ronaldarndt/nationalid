import { Document } from '@/types/general';

const mask = [
    /\d/,
    /\d/,
    /\d/,
    '.',
    /\d/,
    /\d/,
    /\d/,
    '.',
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
];

const cpf = {
    code: 'cpf',
    digits: 11 as const,
    mask: mask,
    name: 'Cadastro de Pessoas Físicas',
    format: (value: string) => {
        return value
            .replaceAll(/[^\d]/g, '')
            .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    },
    formatPartial: (value: string) => {
        const normalized = value.replaceAll(/[^\d]/g, '');
        let result = [...normalized];

        if (result.length >= 3) result = result.toSpliced(3, 0, '.');

        if (result.length >= 7) result = result.toSpliced(7, 0, '.');

        if (result.length >= 11) result = result.toSpliced(11, 0, '-');

        return result.join('');
    },
    validate: (value: string) => {
        const normalized = value.replaceAll(/[^\d]/g, '');

        if (normalized.length !== 11) return false;

        const digits = normalized.split('').map(Number);

        if (digits.every((digit) => digit === digits[0])) return false;

        const firstNineDigits = digits.slice(0, 9);

        const firstDigitAcc = firstNineDigits.reduce(
            (acc, digit, index) => acc + digit * (10 - index),
            0,
        );

        const firstDigit = (firstDigitAcc * 10) % 11;
        const firstDigitFinal = firstDigit === 10 ? 0 : firstDigit;

        const secondDigitAcc = [...firstNineDigits, firstDigitFinal].reduce(
            (acc, digit, index) => acc + digit * (11 - index),
            0,
        );

        const secondDigit = (secondDigitAcc * 10) % 11;
        const secondDigitFinal = secondDigit === 10 ? 0 : secondDigit;

        return firstDigitFinal === digits[9] && secondDigitFinal === digits[10];
    },
} satisfies Document;

export default cpf;
