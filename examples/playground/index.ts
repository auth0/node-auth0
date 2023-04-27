import * as dotenv from 'dotenv';
import { v4 as uuid } from 'uuid';

dotenv.config({
  path: './examples/playground/.env',
});

import { ManagementClient } from '../../src/management/index';

import { program } from 'commander';

program
  .name('node-auth0-playground')
  .option('--domain <domain>', 'your domain', process.env.AUTH0_DOMAIN)
  .option('--client-id <client-id>', 'your client id', process.env.AUTH0_CLIENT_ID)
  .option('--client-secret <client-secret>', 'your client secret', process.env.AUTH0_CLIENT_SECRET)
  .option(
    '--client-assertion-siging-key <client-assertion-siging-key>',
    'your client assertion siging key',
    process.env.AUTH0_CLIENT_ASSERTION_SIGING_KEY
  );

program
  .command('clients')
  .description('Test CRUD on the clients endpoints')
  .action(async () => {
    const mgmntClient = new ManagementClient(program.opts());
    const { data: newClient } = await mgmntClient.clients.create({ name: uuid() });
    console.log('Create a client: ' + newClient.name);
    const { data: client } = await mgmntClient.clients.get({ id: newClient.client_id as string });
    console.log('Get the client: ' + client.name);
    const { data: updatedClient } = await mgmntClient.clients.update(
      { id: client.client_id as string },
      { name: uuid() }
    );
    console.log('Updated the client: ' + updatedClient.name);
    await mgmntClient.clients.delete({ id: newClient.client_id as string });
    console.log('Removed the client: ' + updatedClient.name);
  });

await program.parseAsync(process.argv);
