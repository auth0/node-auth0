import * as dotenv from 'dotenv';

dotenv.config({
  path: './playground/.env',
});

import { program } from 'commander';
import {
  actions,
  attackProtection,
  anomaly,
  blacklists,
  branding,
  clientGrants,
  clients,
  connections,
  customDomains,
  emailTemplates,
  emails,
  guardian,
  hooks,
  jobs,
  keys,
  logStreams,
  logs,
  organizations,
  prompts,
  resourceServers,
  roles,
  rules,
  rulesConfigs,
  stats,
  tenants,
  tickets,
  userBlocks,
  users,
  usersByEmail,
} from './handlers.js';

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
  .command('all')
  .description('Test all endpoints')
  .action(async () => {
    await actions();
    await attackProtection();
    await anomaly();
    await blacklists();
    await branding();
    await clientGrants();
    await clients();
    await connections();
    await customDomains();
    await emailTemplates();
    await emails();
    await guardian();
    await hooks();
    await jobs();
    await keys();
    await logStreams();
    await logs();
    await organizations();
    await prompts();
    await resourceServers();
    await roles();
    await rules();
    await rulesConfigs();
    await stats();
    await tickets();
    await tenants();
    await userBlocks();
    await users();
    await usersByEmail();
  });

program.command('actions').description('Test CRUD on the actions endpoints').action(actions);

program
  .command('attack-protection')
  .description('Test CRUD on the attack protection endpoints')
  .action(attackProtection);

program.command('anomaly').description('Test the anomaly endpoints').action(anomaly);

program.command('blacklists').description('Test the blacklists endpoints').action(blacklists);

program.command('branding').description('Test the branding endpoints').action(branding);

program
  .command('client-grants')
  .description('Test the client-grants endpoints')
  .action(clientGrants);

program.command('clients').description('Test CRUD on the clients endpoints').action(clients);

program.command('connections').description('Test the connections endpoints').action(connections);

program
  .command('custom-domains')
  .description('Test the custom-domains endpoints')
  .action(customDomains);

program
  .command('email-templates')
  .description('Test the email-templates endpoints')
  .action(emailTemplates);

program.command('emails').description('Test the emails endpoints').action(emails);

program.command('guardian').description('Test the guardians endpoints').action(guardian);

program.command('hooks').description('Test the hooks endpoints').action(hooks);

program.command('jobs').description('Test the jobs endpoints').action(jobs);

program.command('keys').description('Test the keys endpoints').action(keys);

program.command('log-streams').description('Test the log streams endpoints').action(logStreams);

program.command('logs').description('Test the logs endpoints').action(logs);

program
  .command('organizations')
  .description('Test the organizations endpoints')
  .action(organizations);

program.command('prompts').description('Test the prompts endpoints').action(prompts);

program
  .command('resource-servers')
  .description('Test the resource-servers endpoints')
  .action(resourceServers);

program.command('roles').description('Test the roles endpoints').action(roles);

program.command('rules').description('Test the rules endpoints').action(rules);

program
  .command('rules-configs')
  .description('Test the rules-configs endpoints')
  .action(rulesConfigs);

program.command('stats').description('Test the stats endpoints').action(stats);

program.command('tickets').description('Test the tickets endpoints').action(tickets);

program.command('tenants').description('Test the tenants endpoints').action(tenants);

program.command('user-blocks').description('Test the user-blocks endpoints').action(userBlocks);

program.command('users').description('Test the users endpoints').action(users);

program
  .command('users-by-email')
  .description('Test the users-by-email endpoints')
  .action(usersByEmail);

await program.parseAsync(process.argv);
