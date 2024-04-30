import { describe, expect, it } from 'bun:test';
import ssn from './ssn';

describe('ssn', () => {
    it('has correct metadata', () => {
        expect(ssn.code).toBe('SSN');
        expect(ssn.digits).toBe(9);
        expect(ssn.name).toBe('Social Security Number');
        expect(ssn.mask).toEqual([
            /\d/,
            /\d/,
            /\d/,
            '-',
            /\d/,
            /\d/,
            '-',
            /\d/,
            /\d/,
            /\d/,
        ]);
        expect(ssn.format).toBeInstanceOf(Function);
        expect(ssn.formatPartial).toBeInstanceOf(Function);
        expect(ssn.validate).toBeInstanceOf(Function);
    });

    it.each([
        { input: '123456789', output: '123-45-6789' },
        {
            input: '6'.repeat(9),
            output: '666-66-6666',
        },
    ])(`formats %p`, ({ input, output }) => {
        expect(ssn.format(input)).toBe(output);
    });

    it.each([
        { input: '1', output: '1' },
        { input: '12', output: '12' },
        { input: '123', output: '123-' },
        { input: '1234', output: '123-4' },
        { input: '12345', output: '123-45-' },
        { input: '123456', output: '123-45-6' },
        { input: '1234567', output: '123-45-67' },
        { input: '12345678', output: '123-45-678' },
        { input: '123456789', output: '123-45-6789' },
    ])(`formats partial %p`, ({ input, output }) => {
        expect(ssn.formatPartial(input)).toBe(output);
    });

    it.each([
        { input: '12345678901', output: false },
        { input: '111111111', output: true },
        { input: '123-45-6789', output: true },
        { input: '123-45-678', output: false },
        { input: '123-45-67890', output: false },
        { input: '123-45-678a', output: false },
        { input: '856-45-6789', output: true },
        { input: '000-45-6789', output: false },
        { input: '666-45-6789', output: false },
        { input: '900-45-6789', output: false },
        { input: '123-00-6789', output: false },
        { input: '123-45-0000', output: false },
    ])(`validates %p`, ({ input, output }) => {
        expect(ssn.validate(input)).toBe(output);
    });
});
