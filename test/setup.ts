import path from 'path';
import { fileURLToPath } from 'url';
import nock from 'nock';
import fetch from 'node-fetch';

const { back: nockBack } = nock;

nockBack.fixtures = path.dirname(fileURLToPath(import.meta.url));

// Falling back to node-fetch because nock doesn't work with native fetch.
globalThis.fetch = fetch as any;
