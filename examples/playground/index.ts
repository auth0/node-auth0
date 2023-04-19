import * as dotenv from 'dotenv';
dotenv.config({
  path: './examples/playground/.env',
});

import { ManagementClient } from '../../src/management/index';

const mgmntClient = new ManagementClient({
  domain: process.env.AUTH0_DOMAIN as string,
  clientId: process.env.AUTH0_CLIENT_ID as string,
  clientSecret: process.env.AUTH0_CLIENT_SECRET as string,
});

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
