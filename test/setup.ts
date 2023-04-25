import path from 'path';
import { fileURLToPath } from 'url';
import nock from 'nock';

const { back: nockBack } = nock;

nockBack.fixtures = path.dirname(fileURLToPath(import.meta.url));
