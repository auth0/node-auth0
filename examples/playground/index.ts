import * as dotenv from 'dotenv';
dotenv.config({
  path: './examples/playground/.env',
});

import {
  ManagementClient,
  ManagementClientOptionsWithClientAssertion,
  ManagementClientOptionsWithClientSecret,
} from '../../src/management/index';

const opts = {
  domain: process.env.AUTH0_DOMAIN as string,
  clientId: process.env.AUTH0_CLIENT_ID as string,
};

if (process.env.AUTH0_CLIENT_SECRET) {
  (opts as ManagementClientOptionsWithClientSecret).clientSecret = process.env.AUTH0_CLIENT_SECRET;
}

if (process.env.AUTH0_CLIENT_ASSERTION_SIGING_KEY) {
  (opts as ManagementClientOptionsWithClientAssertion).clientAssertionSigningKey =
    process.env.AUTH0_CLIENT_ASSERTION_SIGING_KEY;
}

const mgmntClient = new ManagementClient(
  opts as ManagementClientOptionsWithClientAssertion | ManagementClientOptionsWithClientSecret
);

async function testClients() {
  const { data: newClient } = await mgmntClient.clients.create({
    name: 'Test',
  });

  console.log('Create a client: ' + newClient.name);

  const { data: client } = await mgmntClient.clients.get({
    id: newClient.client_id as string,
  });

  console.log('Get the client: ' + client.name);

  const { data: updatedClient } = await mgmntClient.clients.update(
    {
      id: client.client_id as string,
    },
    { name: 'Test2' }
  );

  console.log('Updated the client: ' + updatedClient.name);

  await mgmntClient.clients.delete({
    id: newClient.client_id as string,
  });

  console.log('Removed the client: ' + updatedClient.name);
}

async function main() {
  await testClients();
}

main();
