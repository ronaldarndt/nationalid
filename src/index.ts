import cpf from '@/countries/brazil/cpf';
import genericDocument from '@/countries/generic/generic';
import ssn from '@/countries/us/ssn';

import brazil from '@/countries/brazil';
import genericCountry from '@/countries/generic';
import us from '@/countries/us';

import { Document, DocumentCode } from '@/types/general';

const allDocuments = [brazil, us, genericCountry]
    .map((x) => x.documents)
    .reduce(
        (acc, x) => ({ ...acc, ...x }),
        {} as Record<DocumentCode, Document>,
    );

function getDocumentFromCode(code: DocumentCode): Document {
    return allDocuments[code];
}

export {
    brazil,
    cpf,
    genericCountry,
    genericDocument,
    getDocumentFromCode,
    ssn,
    us,
};
