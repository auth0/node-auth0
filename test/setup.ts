import path from 'path';
import { fileURLToPath } from 'url';
import nock from 'nock';

const { back: nockBack } = nock;

nockBack.fixtures = path.dirname(fileURLToPath(import.meta.url));

// @ts-expect-error Falling back to node-fetch because nock doesn't wotk with native fetch.
delete globalThis.fetch;
