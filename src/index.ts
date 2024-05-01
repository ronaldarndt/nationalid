import cpf from '@/countries/brazil/cpf';
import ssn from '@/countries/us/ssn';

import brazil from '@/countries/brazil';
import us from '@/countries/us';

import { Document, DocumentCode } from '@/types/general';

const allDocuments = [brazil, us]
    .map((x) => x.documents)
    .reduce(
        (acc, x) => ({ ...acc, ...x }),
        {} as Record<DocumentCode, Document>,
    );

function getDocumentFromCode(code: DocumentCode): Document {
    return allDocuments[code];
}

export { brazil, cpf, getDocumentFromCode, ssn, us };
