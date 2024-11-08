import { FlowsManager } from '../../src/index.js';
import { ManagementClient } from '../../src/index.js';
import { checkMethod } from './tests.util.js';

const DOMAIN = `tenant.auth0.com`;
const token = 'TOKEN';

describe('FlowsManager', () => {
  const flowsManager: FlowsManager = new ManagementClient({ domain: DOMAIN, token }).flows;

  describe('flows crud methods', () => {
    // this is the test for the method getFlows()
    // it calls a GET endpoint and does not take any input parameters or body
    describe('getFlows', () => {
      const operation = flowsManager.getAll();
      const uri = `/flows`;
      const method = 'get';

      checkMethod({ operation, uri, method });
    });

    // this is the test for the method getFlowsById()
    // it calls a GET endpoint and takes input parameters but no input body
    describe('getFlowsById', () => {
      const operation = flowsManager.get({ id: 'flowId' });
      const uri = `/flows/flowId`;
      const method = 'get';

      checkMethod({ operation, uri, method });
    });

    // this is the test for the method patchFlowsById()
    // it calls a PATCH endpoint and takes input parameters and body
    describe('patchFlowsById', () => {
      const requestBody: { name: string } = { name: 'flowName' };
      const operation = flowsManager.update({ id: 'flowId' }, requestBody);
      const uri = `/flows/flowId`;
      const method = 'patch';

      checkMethod({ operation, uri, method, requestBody });
    });

    describe('deleteFlowsById', () => {
      const operation = flowsManager.delete({ id: 'flowId' });
      const uri = `/flows/flowId`;
      const method = 'delete';

      checkMethod({ operation, uri, method });
    });

    // this is the test for the method postFlows()
    // it calls a POST endpoint and takes only a body
    describe('postFlows', () => {
      const requestBody: { name: string } = { name: 'flowName' };
      const operation = flowsManager.create(requestBody);
      const uri = `/flows`;
      const method = 'post';
      checkMethod({ operation, uri, method, requestBody });
    });
  });

  describe('connections crud methods', () => {
    // this is the test for the method getConnections()
    // it calls a GET endpoint and does not take any input parameters or body
    describe('getConnections', () => {
      const operation = flowsManager.getAllConnections();
      const uri = `/flows/vault/connections`;
      const method = 'get';

      checkMethod({ operation, uri, method });
    });

    // this is the test for the method getConnectionsById()
    // it calls a GET endpoint and takes input parameters but no input body
    describe('getConnectionsById', () => {
      const operation = flowsManager.getConnection({ id: 'connectionId' });
      const uri = `/flows/vault/connections/connectionId`;
      const method = 'get';

      checkMethod({ operation, uri, method });
    });

    // this is the test for the method patchConnectionsById()
    // it calls a PATCH endpoint and takes input parameters and body
    describe('patchConnectionsById', () => {
      const requestBody: { name: string } = { name: 'flowName' };
      const operation = flowsManager.updateConnection({ id: 'connectionId' }, requestBody);
      const uri = `/flows/vault/connections/connectionId`;
      const method = 'patch';

      checkMethod({ operation, uri, method, requestBody });
    });

    describe('deleteConnectionsById', () => {
      const operation = flowsManager.deleteConnection({ id: 'connectionId' });
      const uri = `/flows/vault/connections/connectionId`;
      const method = 'delete';

      checkMethod({ operation, uri, method });
    });

    // this is the test for the method postConnections()
    // it calls a POST endpoint and takes only a body
    describe('postConnections', () => {
      const requestBody: { name: string } = { name: 'flowName' };
      const operation = flowsManager.createConnection(requestBody);
      const uri = `/flows/vault/connections`;
      const method = 'post';
      checkMethod({ operation, uri, method, requestBody });
    });
  });

  describe('execution crud methods', () => {
    // this is the test for the method getAllExecutions()
    // it calls a GET endpoint and does not take any input parameters or body
    describe('getExecutions', () => {
      const operation = flowsManager.getAllExecutions({ flow_id: 'flowId' });
      const uri = `/flows/flowId/executions`;
      const method = 'get';

      checkMethod({ operation, uri, method });
    });

    // this is the test for the method getExecution()
    describe('getExecutionsById', () => {
      const operation = flowsManager.getExecution({
        flow_id: 'flowId',
        execution_id: 'executionId',
      });
      const uri = `/flows/flowId/executions/executionId`;
      const method = 'get';

      checkMethod({ operation, uri, method });
    });

    describe('deleteExecutionsById', () => {
      const operation = flowsManager.deleteExecution({
        flow_id: 'flowId',
        execution_id: 'executionId',
      });
      const uri = `/flows/flowId/executions/executionId`;
      const method = 'delete';

      checkMethod({ operation, uri, method });
    });
  });
});
