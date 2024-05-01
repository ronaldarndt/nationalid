import { describe, expect, it } from 'bun:test';
import cpf from './cpf';

describe('cpf', () => {
    it('has correct metadata', () => {
        expect(cpf.code).toBe('cpf');
        expect(cpf.digits).toBe(11);
        expect(cpf.name).toBe('Cadastro de Pessoas Físicas');
        expect(cpf.mask).toEqual([
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
        ]);
        expect(cpf.format).toBeInstanceOf(Function);
        expect(cpf.formatPartial).toBeInstanceOf(Function);
        expect(cpf.validate).toBeInstanceOf(Function);
    });

    it.each([
        { input: '12345678901', output: '123.456.789-01' },
        {
            input: '6'.repeat(11),
            output: '666.666.666-66',
        },
    ])(`formats %p`, ({ input, output }) => {
        console.log(cpf);
        expect(cpf.format(input)).toBe(output);
    });

    it.each([
        { input: '1', output: '1' },
        { input: '12', output: '12' },
        { input: '123', output: '123.' },
        { input: '1234', output: '123.4' },
        { input: '12345', output: '123.45' },
        { input: '123456', output: '123.456.' },
        { input: '1234567', output: '123.456.7' },
        { input: '12345678', output: '123.456.78' },
        { input: '123456789', output: '123.456.789-' },
        { input: '1234567890', output: '123.456.789-0' },
        {
            input: '12345678901',
            output: '123.456.789-01',
        },
    ])(`formats partial %p`, ({ input, output }) => {
        expect(cpf.formatPartial(input)).toBe(output);
    });

    it.each([
        { input: '12345678901', output: false },
        { input: '11111111111', output: false },
        { input: '123.456.789-01', output: false },
        { input: '123.456.789-00', output: false },
        { input: '123.456.789-0', output: false },
        { input: '123.456.789-012', output: false },
        { input: '123.456.789-0a', output: false },
        { input: '123.456.789-0a1', output: false },
        { input: '123.456.789-0a1b', output: false },
        { input: '6'.repeat(11), output: false },
        { input: '275.857.015-78', output: true },
        { input: '27585701578', output: true },
    ])(`validates %p`, ({ input, output }) => {
        expect(cpf.validate(input)).toBe(output);
    });
});
