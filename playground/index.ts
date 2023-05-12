import * as dotenv from 'dotenv';
import { v4 as uuid } from 'uuid';

dotenv.config({
  path: './playground/.env',
});

import { ManagementApiError, ManagementClient } from '../src/management/index';

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
  .command('actions')
  .description('Test CRUD on the actions endpoints')
  .action(async () => {
    const mgmntClient = new ManagementClient(program.opts());

    const { data: newAction } = await mgmntClient.actions.create({
      name: 'Test Action',
      supported_triggers: [{ id: 'post-login', version: 'v2' }],
      runtime: 'node16',
      code: 'exports.onExecutePostLogin = async (event, api) => {};',
    });
    console.log('Create an action: ' + newAction.name);

    const { data: action } = await mgmntClient.actions.get({ id: newAction.id as string });
    console.log('Get the action: ' + action.name);

    await mgmntClient.actions.deploy({ id: newAction.id as string });
    console.log('Deployed the action');

    const versions = await mgmntClient.actions.getVersions({
      actionId: newAction.id as string,
    });
    console.log(`Found ${versions.data.versions?.length} versions for the action after deploying.`);

    const { data: updatedAction } = await mgmntClient.actions.update(
      { id: action.id as string },
      {
        name: 'Test Action (updated)',
        runtime: 'node16',
        code: 'exports.onExecutePostLogin = async (event, api) => {};',
      }
    );
    console.log('Updated the action: ' + updatedAction.id);

    await mgmntClient.actions.deploy({ id: newAction.id as string });

    console.log('Deployed the action');

    const updatedVersions = await mgmntClient.actions.getVersions({
      actionId: newAction.id as string,
    });
    console.log(
      `Found ${updatedVersions.data.versions?.length} versions for the action after deploying.`
    );

    await mgmntClient.actions.delete({ id: newAction.id as string });
    console.log('Removed the action: ' + updatedAction.name);
  });

program
  .command('anomaly')
  .description('Test the anomaly endpoints')
  .action(async () => {
    const mgmntClient = new ManagementClient(program.opts());
    try {
      await mgmntClient.anomaly.checkIfIpIsBlocked({
        id: '127.0.0.1',
      });
    } catch (e) {
      const err = e as ManagementApiError;
      if (err.statusCode === 404) {
        console.log('Checking ip 127.0.0.1, not blocked!');
      }
    }
    await mgmntClient.anomaly.deleteBlockedIp({
      id: '127.0.0.1',
    });
    console.log('Unblocking ip 127.0.0.1, success!');
  });

program
  .command('blacklists')
  .description('Test the blacklists endpoints')
  .action(async () => {
    const mgmntClient = new ManagementClient(program.opts());
    const { clientId } = program.opts();

    await mgmntClient.blacklists.add({
      jti: 'test_jti',
      aud: clientId,
    });
    console.log(`Added 'test_jti' to blacklist for client '${clientId}'`);
    const blacklisted = await mgmntClient.blacklists.getAll({
      aud: clientId,
    });
    console.log('Currently there are ' + blacklisted.data.length + ' entries blacklists');
  });

program
  .command('branding')
  .description('Test the branding endpoints')
  .action(async () => {
    const mgmntClient = new ManagementClient(program.opts());

    const originalSettings = await mgmntClient.branding.getSettings();

    console.log(`Retrieved original primary color: '${originalSettings.data.colors?.primary}'`);

    const updatedSettings = await mgmntClient.branding.updateSettings({
      colors: { primary: '#000000' },
    });

    console.log(`Updated primary color to '${updatedSettings.data.colors?.primary}'`);

    await mgmntClient.branding.updateSettings(originalSettings.data);

    console.log('Restored settings to original settings');

    const newTheme = await mgmntClient.branding.createTheme({
      colors: {
        primary_button: '#ff916f',
        primary_button_label: '#ffffff',
        secondary_button_border: '#c9cace',
        secondary_button_label: '#1e212a',
        base_focus_color: '#ff916f',
        base_hover_color: '#000000',
        links_focused_components: '#ff916f',
        header: '#1e212a',
        body_text: '#1e212a',
        widget_background: '#ffffff',
        widget_border: '#c9cace',
        input_labels_placeholders: '#65676e',
        input_filled_text: '#000000',
        input_border: '#c9cace',
        input_background: '#ffffff',
        icons: '#65676e',
        error: '#d03c38',
        success: '#13a688',
      },
      fonts: {
        font_url: '',
        reference_text_size: 16,
        title: { bold: false, size: 150 },
        subtitle: { bold: false, size: 87.5 },
        body_text: { bold: false, size: 87.5 },
        buttons_text: { bold: false, size: 100 },
        input_labels: { bold: false, size: 100 },
        links: { bold: true, size: 87.5 },
        links_style: 'normal',
      },
      borders: {
        button_border_weight: 1,
        buttons_style: 'rounded',
        button_border_radius: 3,
        input_border_weight: 1,
        inputs_style: 'rounded',
        input_border_radius: 3,
        widget_corner_radius: 5,
        widget_border_weight: 0,
        show_widget_shadow: true,
      },
      widget: {
        logo_position: 'center',
        logo_url: '',
        logo_height: 52,
        header_text_alignment: 'center',
        social_buttons_layout: 'bottom',
      },
      page_background: {
        page_layout: 'center',
        background_color: '#000000',
        background_image_url: '',
      },
      displayName: 'New Theme',
    });

    console.log(`Created new theme with body_text color '${newTheme.data.colors.body_text}'`);

    const { themeId, ...newThemePayload } = newTheme.data;
    const updatedTheme = await mgmntClient.branding.updateTheme(
      {
        themeId: themeId,
      },
      {
        ...newThemePayload,
        colors: {
          ...newThemePayload.colors,
          body_text: '#00ff00',
        },
      }
    );

    console.log(`Created new theme to use body_text color '${updatedTheme.data.colors.body_text}'`);

    await mgmntClient.branding.deleteTheme({ themeId: updatedTheme.data.themeId });

    console.log(`Deleted theme with id '${updatedTheme.data.themeId}'`);
  });

program
  .command('client-grants')
  .description('Test the client-grants endpoints')
  .action(async () => {
    const mgmntClient = new ManagementClient(program.opts());

    // Create API for testing
    await mgmntClient.resourceServers.create({
      identifier: 'ClientGrantTests',
    });
    const api = (await mgmntClient.resourceServers.getAll()).data.find(
      (api) => api.identifier === 'ClientGrantTests'
    );

    await mgmntClient.clientGrants.create({
      client_id: program.opts().clientId,
      audience: api?.identifier as string,
      scope: ['openid'],
    });

    const { data: newClientGrant } = await mgmntClient.clientGrants.getAll({
      audience: api?.identifier as string,
      client_id: program.opts().clientId,
    });

    console.log(`Created client grant ${newClientGrant[0].id}`);

    const { data: updatedClientGrant } = await mgmntClient.clientGrants.update(
      { id: newClientGrant[0].id as string },
      { scope: ['openid', 'profile'] }
    );

    console.log(`Updated client grant to use scopes '${updatedClientGrant.scope?.join(', ')}'`);

    // Delete API for testing
    await mgmntClient.resourceServers.delete({ id: api?.id as string });

    await mgmntClient.clientGrants.delete({ id: newClientGrant[0].id as string });
    console.log('Removed the client grant: ' + newClientGrant[0].id);
  });

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

program
  .command('connections')
  .description('Test the connections endpoints')
  .action(async () => {
    const mgmntClient = new ManagementClient(program.opts());
    const { data: newConnection } = await mgmntClient.connections.create({
      name: uuid(),
      display_name: uuid(),
      strategy: 'auth0',
    });
    console.log('Create a connection: ' + newConnection.display_name);
    const { data: connection } = await mgmntClient.connections.get({
      id: newConnection.id as string,
    });
    console.log('Get the connection: ' + connection.display_name);
    const { data: updatedConnection } = await mgmntClient.connections.update(
      { id: connection.id as string },
      { display_name: uuid() }
    );
    console.log('Updated the connection: ' + updatedConnection.display_name);
    await mgmntClient.connections.delete({ id: newConnection.id as string });
    console.log('Removed the connection: ' + updatedConnection.display_name);
  });

program
  .command('custom-domains')
  .description('Test the custom-domains endpoints')
  .action(async () => {
    const mgmntClient = new ManagementClient(program.opts());
    const { data: newDomain } = await mgmntClient.customDomains.create({
      domain: 'www.test.com',
      type: 'self_managed_certs',
    });
    console.log('Create a custom domain: ' + newDomain.domain);
    const { data: domain } = await mgmntClient.customDomains.get({
      id: newDomain.custom_domain_id,
    });
    console.log('Get the custom domain: ' + domain.domain);
    const { data: updatedDomain } = await mgmntClient.customDomains.update(
      { id: domain.custom_domain_id as string },
      { custom_client_ip_header: 'cf-connecting-ip' }
    );
    console.log('Updated the custom domain: ' + updatedDomain.domain);
    await mgmntClient.customDomains.delete({ id: newDomain.custom_domain_id as string });
    console.log('Removed the custom domain: ' + updatedDomain.domain);
  });

program
  .command('email-templates')
  .description('Test the email-templates endpoints')
  .action(async () => {
    const mgmntClient = new ManagementClient(program.opts());

    try {
      const { data: newEmailTemplate } = await mgmntClient.emailTemplates.create({
        template: 'verify_email',
        body: 'test_body',
        from: 'new@email.com',
        resultUrl: 'test_url',
        subject: 'test_subject',
        syntax: 'liquid',
        urlLifetimeInSeconds: 50,
        includeEmailInRedirect: false,
        enabled: false,
      });
      console.log('Create an email template with body: ' + newEmailTemplate.body);
    } catch (e) {
      const err = e as ManagementApiError;

      if (err.msg === 'Template verify_email already exists.') {
        console.log('Template already exists, skipping creation');
      }
    }

    const { data: emailTemplate } = await mgmntClient.emailTemplates.get({
      templateName: 'verify_email',
    });
    console.log(`Get email template: ${emailTemplate.template}`);

    const { data: updatedEmailTemplate } = await mgmntClient.emailTemplates.update(
      { templateName: 'verify_email' },
      { body: 'test2' }
    );
    console.log('Updated the email template with body: ' + updatedEmailTemplate.body);
  });

program
  .command('emails')
  .description('Test the emails endpoints')
  .action(async () => {
    const mgmntClient = new ManagementClient(program.opts());

    try {
      const { data: newProvider } = await mgmntClient.emails.configure({
        name: 'mandrill',
        credentials: {
          api_key: 'ABC',
        },
      });
      console.log(`Configure an email provider: ${newProvider.name}`);
    } catch (e) {
      console.log('Email provider already configured, skipping configuring.');
    }

    const { data: provider } = await mgmntClient.emails.get();

    console.log(`Get email provider: ${provider.name}`);

    const { data: updatedProvider } = await mgmntClient.emails.update({
      name: 'mandrill',
      credentials: {
        api_key: 'ABCD',
      },
    });
    console.log(`Update an email provider: ${updatedProvider.name}`);
  });

await program.parseAsync(process.argv);
