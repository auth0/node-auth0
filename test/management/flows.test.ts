import nock from 'nock';
import { FlowsManager } from '../../src/index.js';
import { ManagementClient } from '../../src/index.js';
import {
  checkForPromise,
  checkErrorHandler,
  checkRequestInterceptor,
  checkOperation,
} from './tests.util.js';
import { GetFlows200Response } from '../../src/index.js';

const DOMAIN = `tenant.auth0.com`;
const API_URL = `https://${DOMAIN}/api/v2`;
const token = 'TOKEN';

describe('FlowsManager', () => {
  const flowsManager: FlowsManager = new ManagementClient({ domain: DOMAIN, token }).flows;

  describe('getFlows', () => {
    // expected response from the API
    const expectedResponse: GetFlows200Response = [
      {
        id: 'flw_123',
        name: 'test',
        created_at: '2024-10-23T09:29:24.286Z',
        updated_at: '2024-10-23T09:29:24.286Z',
        executed_at: '2024-10-23T09:29:24.286Z',
      },
    ];

    // getFlows method
    const operation = flowsManager.getFlows();

    // clean all previous nocks
    nock.cleanAll();

    // nock the API with success scenario
    let request: nock.Scope = nock(API_URL).get('/flows').reply(200, expectedResponse);
    checkForPromise(operation);
    checkRequestInterceptor(operation, request, '/flows');
    checkOperation(operation, expectedResponse);

    // nock the API with error scenario
    request = nock(API_URL).get('/flows').reply(500);
    checkErrorHandler(operation);
  });

  describe('getFlows', () => {
    // expected response from the API
    const expectedResponse: GetFlows200Response = [
      {
        id: 'flw_123',
        name: 'test',
        created_at: '2024-10-23T09:29:24.286Z',
        updated_at: '2024-10-23T09:29:24.286Z',
        executed_at: '2024-10-23T09:29:24.286Z',
      },
    ];

    // getFlows method
    const operation = flowsManager.getFlows();

    // clean all previous nocks
    nock.cleanAll();

    // nock the API with success scenario
    let request: nock.Scope = nock(API_URL).get('/flows').reply(200, expectedResponse);
    checkForPromise(operation);
    checkRequestInterceptor(operation, request, '/flows');
    checkOperation(operation, expectedResponse);

    // nock the API with error scenario
    request = nock(API_URL).get('/flows').reply(500);
    checkErrorHandler(operation);
  });
});
