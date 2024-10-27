import { FlowsManager } from '../../src/index.js';
import { ManagementClient } from '../../src/index.js';
import { checkMethod } from './tests.util.js';
import { GetFlows200Response, PostFlows201Response } from '../../src/index.js';

const DOMAIN = `tenant.auth0.com`;
const token = 'TOKEN';

describe('FlowsManager', () => {
  const flowsManager: FlowsManager = new ManagementClient({ domain: DOMAIN, token }).flows;

  // this is the test for the method getFlows()
  // it calls a GET endpoint and does not take any input parameters or body
  describe('getFlows', () => {
    const operation = flowsManager.getFlows();
    const expectedResponse: GetFlows200Response = <GetFlows200Response>{};
    const uri = `/flows`;
    const method = 'get';

    checkMethod({ operation, expectedResponse, uri, method });
  });

  // this is the test for the method getFlowsById()
  // it calls a GET endpoint and takes input parameters but no input body
  describe('getFlowsById', () => {
    const operation = flowsManager.getFlowsById({ id: 'flowId' });
    const expectedResponse: PostFlows201Response = <PostFlows201Response>{};
    const uri = `/flows/flowId`;
    const method = 'get';

    checkMethod({ operation, expectedResponse, uri, method });
  });

  // this is the test for the method patchFlowsById()
  // it calls a PATCH endpoint and takes input parameters and body
  describe('patchFlowsById', () => {
    const requestBody: { name: string } = { name: 'flowName' };
    const operation = flowsManager.patchFlowsById({ id: 'flowId' }, requestBody);
    const expectedResponse: PostFlows201Response = <PostFlows201Response>{};
    const uri = `/flows/flowId`;
    const method = 'patch';

    checkMethod({ operation, expectedResponse, uri, method, requestBody });
  });

  // this is the test for the method postFlows()
  // it calls a POST endpoint and takes only a body
  describe('postFlows', () => {
    const requestBody: { name: string } = { name: 'flowName' };
    const operation = flowsManager.postFlows(requestBody);
    const expectedResponse: PostFlows201Response = <PostFlows201Response>{};
    const uri = `/flows`;
    const method = 'post';

    checkMethod({ operation, expectedResponse, uri, method, requestBody });
  });
});
