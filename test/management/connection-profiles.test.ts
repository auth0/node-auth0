import {
    ManagementClient,
    ConnectionProfilesManager,
    GetConnectionProfilesByIdRequest,
    CreateConnectionProfileRequestContent,
    UpdateConnectionProfileRequestContent,
    DeleteConnectionProfilesByIdRequest,
    GetConnectionProfileTemplateRequest,
    GetConnectionProfilesRequest,
    PatchConnectionProfilesByIdRequest,
} from '../../src/index.js';

import { checkMethod } from './tests.util.js';

const DOMAIN = `tenant.auth0.com`;
const token = 'TOKEN';

describe('ConnectionProfilesManager', () => {
    const connectionProfilesManager: ConnectionProfilesManager = new ManagementClient({
        domain: DOMAIN,
        token,
    }).connectionProfiles;

    // this is the test for the method connectionProfilesManager.getAll
    describe('getAll', () => {
        const requestParameters: GetConnectionProfilesRequest = {
            from: 'id',
            take: 10,
        };
        const operation = connectionProfilesManager.getAll();
        const uri = `/connection-profiles`;
        const method = 'get';

        checkMethod({ operation, uri, method });
    });

    // this is the test for the method connectionProfilesManager.get
    describe('get', () => {
        const requestParameters: GetConnectionProfilesByIdRequest = {
            id: 'id',
        };
        const operation = connectionProfilesManager.get(requestParameters);
        const uri = `/connection-profiles/id`;
        const method = 'get';

        checkMethod({ operation, uri, method });
    });

    // this is the test for the method connectionProfilesManager.create
    describe('create', () => {
        const createPayload: CreateConnectionProfileRequestContent = {
            name: 'Test Connection Profile',
        };
        const operation = connectionProfilesManager.create(createPayload);
        const uri = `/connection-profiles`;
        const method = 'post';

        checkMethod({ operation, uri, method });
    });

    // this is the test for the method connectionProfilesManager.update
    describe('update', () => {
        const requestParameters: PatchConnectionProfilesByIdRequest = {
            id: 'id',
        };
        const updatePayload: UpdateConnectionProfileRequestContent = {
            organization: undefined,
        };
        const operation = connectionProfilesManager.update(requestParameters, updatePayload);
        const uri = `/connection-profiles/id`;
        const method = 'patch';

        checkMethod({ operation, uri, method });
    });

    // this is the test for the method connectionProfilesManager.delete
    describe('delete', () => {
        const requestParameters: DeleteConnectionProfilesByIdRequest = {
            id: 'id',
        };
        const operation = connectionProfilesManager.delete(requestParameters);
        const uri = `/connection-profiles/id`;
        const method = 'delete';

        checkMethod({ operation, uri, method });
    });

    // this is the test for the method connectionProfilesManager.getAllTemplates
    describe('getAllTemplates', () => {
        const operation = connectionProfilesManager.getAllTemplates();
        const uri = `/connection-profiles/templates`;
        const method = 'get';

        checkMethod({ operation, uri, method });
    });

    // this is the test for the method connectionProfilesManager.getTemplate
    describe('getTemplate', () => {
        const requestParameters: GetConnectionProfileTemplateRequest = {
            id: 'id',
        };
        const operation = connectionProfilesManager.getTemplate(requestParameters);
        const uri = `/connection-profiles/templates/id`;
        const method = 'get';

        checkMethod({ operation, uri, method });
    });
});