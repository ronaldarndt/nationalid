type CountryCode = 'br' | 'us' | 'generic';
type DocumentCode = 'cpf' | 'ssn' | 'generic';

interface Document {
    name: string;
    code: DocumentCode;
    digits: number;
    mask: Array<string | RegExp>;
    format: (value: string) => string;
    formatPartial: (value: string) => string;
    validate: (value: string) => boolean;
}

interface Country {
    name: string;
    code: CountryCode;
    documents: Partial<Record<DocumentCode, Document>>;
}

export { Country, CountryCode, Document, DocumentCode };
