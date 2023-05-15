import * as dotenv from 'dotenv';
import { v4 as uuid } from 'uuid';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: './playground/.env',
});

import {
  Connection,
  ManagementApiError,
  ManagementClient,
  ManagementClientOptionsWithClientCredentials,
  PutAuthenticationMethodsRequestInner,
  ResourceServer,
} from '../src/management/index';

import { program } from 'commander';
import { JSONApiResponse } from '../src/lib';

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

program
  .command('guardian')
  .description('Test the guardians endpoints')
  .action(async () => {
    // Increase the maxRetries, as there are a lot of calls happening.
    const mgmntClient = new ManagementClient({ ...program.opts(), retry: { maxRetries: 9 } });

    const { data: factors } = await mgmntClient.guardian.getFactors();

    console.log(`Get ${factors.length} factors: ${factors.map((f) => f.name).join(', ')}`);

    await mgmntClient.guardian.updateFactor({ name: 'sms' }, { enabled: false });

    console.log(`Disabled SMS factor`);

    const { data: smsTwilioConfiguration } =
      await mgmntClient.guardian.getSmsFactorProviderTwilio();

    console.log(`Get SMS Twilio Configuration, token: ${smsTwilioConfiguration.auth_token}`);

    const { data: updatedSmsTwilioConfiguration } =
      await mgmntClient.guardian.setSmsFactorProviderTwilio({
        auth_token: uuid(),
        from: '+123456789',
        messaging_service_sid: uuid(),
      });

    console.log(
      `Update SMS Twilio Configuration, token: ${updatedSmsTwilioConfiguration.auth_token}`
    );

    const { data: phoneTwilioConfiguration } =
      await mgmntClient.guardian.getPhoneFactorProviderTwilio();

    console.log(`Get phone Twilio Configuration, token: ${phoneTwilioConfiguration.auth_token}`);

    const { data: updatedPhoneTwilioConfiguration } =
      await mgmntClient.guardian.updatePhoneFactorProviderTwilio({
        auth_token: uuid(),
        from: '+123456789',
        messaging_service_sid: uuid(),
      });

    console.log(
      `Update Phone Twilio Configuration, token: ${updatedPhoneTwilioConfiguration.auth_token}`
    );

    const { data: pushNotificationAPNSConfiguration } =
      await mgmntClient.guardian.getPushNotificationProviderAPNS();

    console.log(
      `Get Push Notification APNS Configuration, bundle_id: ${pushNotificationAPNSConfiguration.bundle_id}`
    );

    const { data: updatedPushNotificationAPNSConfiguration } =
      await mgmntClient.guardian.updatePushNotificationProviderAPNS({
        bundle_id: uuid(),
      });

    console.log(
      `Update Push Notification APNS Configuration, token: ${updatedPushNotificationAPNSConfiguration.bundle_id}`
    );

    const { data: pushNotificationSNSConfiguration } =
      await mgmntClient.guardian.getPushNotificationProviderSNS();

    console.log(
      `Get Push Notification SNS Configuration, aws_secret_access_key: ${pushNotificationSNSConfiguration.aws_secret_access_key}`
    );

    const { data: updatedPushNotificationSNSConfiguration } =
      await mgmntClient.guardian.updatePushNotificationProviderSNS({
        aws_secret_access_key: uuid(),
      });

    console.log(
      `Update Push Notification SNS Configuration, aws_secret_access_key: ${updatedPushNotificationSNSConfiguration.aws_secret_access_key}`
    );

    const { data: pushNotificationFCMConfiguration } =
      await mgmntClient.guardian.updatePushNotificationProviderFCM({ server_key: uuid() });

    console.log(
      `Update Push Notification FCM Configuration, server_key: ${pushNotificationFCMConfiguration.server_key}`
    );

    const { data: smsTemplates } = await mgmntClient.guardian.getSmsFactorTemplates();

    console.log(`Get SMS enrollement message: ${smsTemplates.enrollment_message}`);
    console.log(`Get SMS verification message: ${smsTemplates.verification_message}`);

    const { data: updateSmsTemplates } = await mgmntClient.guardian.setSmsFactorTemplates({
      enrollment_message: 'This is the encrollment message ' + uuid(),
      verification_message: 'This is the verification message ' + uuid(),
    });

    console.log(`Update SMS enrollement message: ${updateSmsTemplates.enrollment_message}`);
    console.log(`Update SMS verification message: ${updateSmsTemplates.verification_message}`);

    const { data: phoneTemplates } = await mgmntClient.guardian.getPhoneFactorTemplates();

    console.log(`Get phone enrollement message: ${phoneTemplates.enrollment_message}`);
    console.log(`Get phone verification message: ${phoneTemplates.verification_message}`);

    const { data: updatePhoneTemplates } = await mgmntClient.guardian.setPhoneFactorTemplates({
      enrollment_message: 'This is the encrollment message ' + uuid(),
      verification_message: 'This is the verification message ' + uuid(),
    });

    console.log(`Update phone enrollement message: ${updatePhoneTemplates.enrollment_message}`);
    console.log(`Update phone verification message: ${updatePhoneTemplates.verification_message}`);

    await mgmntClient.guardian.setSmsSelectedProvider({ provider: 'twilio' });

    console.log(`Set SMS selected provider to Twilio`);

    await mgmntClient.guardian.setPushNotificationSelectedProvider({ provider: 'sns' });

    console.log(`Set Push Notification selected provider to SNS`);

    const { data: newConnection } = await mgmntClient.connections.create({
      name: 'TestConnection',
      strategy: 'auth0',
      enabled_clients: [program.opts().clientId],
    });

    const { data: newUser } = await mgmntClient.users.create({
      connection: newConnection.name as string,
      email: 'test@test.com',
      email_verified: true,
      password: 'jd78w3hku23134?',
    });

    const { data: newEnrollement } = await mgmntClient.guardian.createEnrollmentTicket({
      user_id: newUser.user_id as string,
      send_mail: false,
    });

    console.log(`create enrollment ticket with url ${newEnrollement.ticket_url}`);

    await mgmntClient.users.delete({
      id: newUser.user_id as string,
    });
    await mgmntClient.connections.delete({
      id: newConnection.id as string,
    });

    const { data: phoneFactorMessageTypes } =
      await mgmntClient.guardian.getPhoneFactorMessageTypes();

    console.log(
      'Get phone factor message types: ' + phoneFactorMessageTypes.message_types?.join(', ')
    );

    const { data: updatePhoneFactorMessageTypes } =
      await mgmntClient.guardian.updatePhoneFactorMessageTypes({
        message_types: ['sms'],
      });

    console.log(
      'Update phone factor message types: ' +
        updatePhoneFactorMessageTypes.message_types?.join(', ')
    );

    const { data: phoneFactorSelectedProvider } =
      await mgmntClient.guardian.getPhoneFactorSelectedProvider();

    console.log('Get phone factor selected provider: ' + phoneFactorSelectedProvider.provider);

    const { data: updatePhoneFactorSelectedProvider } =
      await mgmntClient.guardian.updatePhoneFactorSelectedProvider({
        provider: 'auth0',
      });

    console.log(
      'Update phone factor selected provider: ' + updatePhoneFactorSelectedProvider.provider
    );

    const { data: smsSelectedProvider } = await mgmntClient.guardian.getSmsSelectedProvider();

    console.log('Get sms factor selected provider: ' + smsSelectedProvider.provider);

    const { data: updateSmsSelectedProvider } = await mgmntClient.guardian.setSmsSelectedProvider({
      provider: 'auth0',
    });

    console.log('Update sms factor selected provider: ' + updateSmsSelectedProvider.provider);

    const { data: policies } = await mgmntClient.guardian.getPolicies();

    console.log(`Get policies: ${policies.join(', ')}`);

    const { data: updatedPolicies } = await mgmntClient.guardian.updatePolicies([
      'all-applications',
    ]);

    console.log(`Update policies: ${updatedPolicies.join(', ')}`);

    const { data: resetPolicies } = await mgmntClient.guardian.updatePolicies([]);

    console.log(`Reset policies back to original: ${resetPolicies.join(', ')}`);
  });

program
  .command('hooks')
  .description('Test the hooks endpoints')
  .action(async () => {
    const mgmntClient = new ManagementClient(program.opts());

    const { data: newHook } = await mgmntClient.hooks.create({
      name: 'Test Hook',
      script: `console.log('hello')`,
      triggerId: 'pre-user-registration',
    });

    console.log(`Create hook: ${newHook.name}`);

    const { data: updatedHook } = await mgmntClient.hooks.update(
      {
        id: newHook.id as string,
      },
      { name: 'Test Hook 2' }
    );

    console.log(`Update hook: ${updatedHook.name}`);

    const { data: hook } = await mgmntClient.hooks.get({ id: updatedHook.id as string });

    console.log(`Get hook: ${hook.name}`);

    await mgmntClient.hooks.addSecrets(
      {
        id: newHook.id as string,
      },
      { 'test-key': 'test-value', 'test-key-2': 'test-value-2' }
    );

    console.log(`Add secrets`);

    const { data: secrets } = await mgmntClient.hooks.getSecrets({
      id: updatedHook.id as string,
    });

    console.log(`Get secrets: ${JSON.stringify(secrets)} }`);

    await mgmntClient.hooks.updateSecrets(
      {
        id: newHook.id as string,
      },
      {
        'test-key': 'test-value-updated',
        'test-key-2': 'test-value-2',
      }
    );

    console.log(`Update secrets`);

    await mgmntClient.hooks.deleteSecrets(
      {
        id: newHook.id as string,
      },
      ['test-key']
    );

    console.log(`Delete secret 'test-key'`);

    const { data: secretsAfterDelete } = await mgmntClient.hooks.getSecrets({
      id: updatedHook.id as string,
    });

    console.log(`Get secrets after deleting one: ${JSON.stringify(secretsAfterDelete)} }`);

    await mgmntClient.hooks.delete({
      id: newHook.id as string,
    });

    console.log('Delete hook');
  });

program
  .command('jobs')
  .description('Test the custom-domains endpoints')
  .action(async () => {
    const mgmntClient = new ManagementClient(program.opts());

    // Create test connection

    const { data: connection } = await mgmntClient.connections.create({
      name: 'ConnectionTest',
      strategy: 'auth0',
      enabled_clients: [program.opts().clientId],
    });

    const usersFilePath = path.join(__dirname, '../test/data/users.json');
    const usersFileData = fs.readFileSync(usersFilePath, 'utf-8');

    const { data: createImportJob } = await mgmntClient.jobs.importUsers({
      users: new Blob([usersFileData], {
        type: 'application/json',
      }),
      connection_id: connection.id as string,
    });

    console.log(`Import users: ${createImportJob.id}`);

    let isDone = false;

    while (!isDone) {
      const { data: importJob } = await mgmntClient.jobs.get({
        id: createImportJob.id,
      });
      console.log(`Get import job: ${importJob.id} - ${importJob.status}`);

      if (importJob.status === 'completed' || importJob.status === 'failed') {
        isDone = true;
      } else {
        await new Promise((resolve) => setTimeout(resolve, 3000));
      }
    }

    const { data: createExportJob } = await mgmntClient.jobs.exportUsers({
      connection_id: connection.id,
    });

    console.log(`Export users: ${createExportJob.id}`);

    isDone = false;
    while (!isDone) {
      const { data: exportJob } = await mgmntClient.jobs.get({
        id: createExportJob.id,
      });
      console.log(`Get export job: ${exportJob.id} - ${exportJob.status}`);

      if (exportJob.status === 'completed' || exportJob.status === 'failed') {
        isDone = true;
      } else {
        await new Promise((resolve) => setTimeout(resolve, 3000));
      }
    }

    await mgmntClient.connections.delete({ id: connection.id as string });
  });

program
  .command('resource-servers')
  .description('Test the resource-servers endpoints')
  .action(async () => {
    const mgmntClient = new ManagementClient(program.opts());

    const apiId = `api_${uuid()}`;
    await mgmntClient.resourceServers.create({
      identifier: apiId,
      scopes: [{ value: 'foo' }],
    });
    const createdApi = (await mgmntClient.resourceServers.getAll()).data.find(
      (api) => api.identifier === apiId
    ) as ResourceServer;
    console.log('Created api:', createdApi.id);

    try {
      const { data: gotApi } = await mgmntClient.resourceServers.get({
        id: createdApi.id as string,
      });
      console.log('Got API: ', gotApi.id);

      const { data: gotApis } = await mgmntClient.resourceServers.getAll();
      console.log(
        'Got APIs: ',
        gotApis.map((api) => api.id)
      );

      await mgmntClient.resourceServers.update(
        {
          id: createdApi.id as string,
        },
        { token_lifetime: (createdApi.token_lifetime as number) + 1 }
      );
      const { data: gotUpdatedApi } = await mgmntClient.resourceServers.get({
        id: createdApi.id as string,
      });
      console.log(
        'Updated API token_lifetime from:',
        createdApi.token_lifetime,
        'to',
        gotUpdatedApi.token_lifetime
      );
    } catch (e) {
      throw e;
    } finally {
      await mgmntClient.resourceServers.delete({
        id: createdApi.id as string,
      });
      console.log('Deleted api:', createdApi.id);
    }
  });

program
  .command('roles')
  .description('Test the roles endpoints')
  .action(async () => {
    const mgmntClient = new ManagementClient(program.opts());

    const { data: createdRole } = await mgmntClient.roles.create({
      name: uuid(),
    });
    console.log('Created role:', createdRole.name);

    const apiId = `api_${uuid()}`;
    await mgmntClient.resourceServers.create({
      identifier: apiId,
      scopes: [{ value: 'foo' }],
    });
    const createdApi = (await mgmntClient.resourceServers.getAll()).data.find(
      (api) => api.identifier === apiId
    ) as ResourceServer;
    console.log('Created api:', createdApi.id);

    const email = `${uuid()}@example.com`;
    const { data: createdUser } = await mgmntClient.users.create({
      email,
      password: uuid(),
      email_verified: true,
      connection: 'Username-Password-Authentication',
    });
    console.log('Created user:', createdUser.user_id);

    try {
      const { data: gotRole } = await mgmntClient.roles.get({
        id: createdRole.id as string,
      });
      console.log('Got role:', gotRole.name);

      const { data: gotRoles } = await mgmntClient.roles.getAll();
      console.log(
        'Got roles:',
        gotRoles.map((role) => role.name)
      );

      const { data: updatedRole } = await mgmntClient.roles.update(
        { id: createdRole.id as string },
        { name: uuid() }
      );
      console.log('Updated role name from:', gotRole.name, 'to', updatedRole.name);

      const { data: addedPermisions } = await mgmntClient.roles.addPermissions(
        { id: createdRole.id as string },
        {
          permissions: [{ permission_name: 'foo', resource_server_identifier: apiId }],
        }
      );
      console.log('Added permissions:', addedPermisions, 'to', updatedRole.name);

      const { data: gotPermissions } = await mgmntClient.roles.getPermissions({
        id: createdRole.id as string,
      });
      console.log(
        'Got permission for:',
        createdRole.id,
        gotPermissions.map((permission) => permission.permission_name)
      );

      await mgmntClient.roles.deletePermissions(
        { id: createdRole.id as string },
        { permissions: [{ permission_name: 'foo', resource_server_identifier: apiId }] }
      );
      console.log('Deleted permission foo for:', createdRole.id);

      await mgmntClient.roles.assignUsers(
        { id: createdRole.id as string },
        { users: [createdUser.user_id as string] }
      );
      console.log('Assigned role:', createdRole.id, 'to', createdUser.user_id);

      const { data: users } = await mgmntClient.roles.getUsers({ id: createdRole.id as string });
      console.log(
        'Got users:',
        users.map((user) => user.email),
        'for',
        createdRole.id
      );
    } catch (e) {
      throw e;
    } finally {
      await mgmntClient.roles.delete({
        id: createdRole.id as string,
      });
      console.log('Deleted role:', createdRole.name);
      await mgmntClient.resourceServers.delete({
        id: createdApi.id as string,
      });
      console.log('Deleted api:', createdApi.name);
      await mgmntClient.users.delete({
        id: createdUser.user_id as string,
      });
      console.log('Deleted user:', createdUser.user_id);
    }
  });

program
  .command('rules')
  .description('Test the rules endpoints')
  .action(async () => {
    const mgmntClient = new ManagementClient(program.opts());

    const script = `function (user, context, callback) {
      callback(null, user, context);
    }`;

    const { data: createdRule } = await mgmntClient.rules.create({
      name: `tmp${uuid().replace(/-/g, '')}`,
      script,
      enabled: false,
    });
    console.log('Created rule:', createdRule.name);

    const { data: gotRule } = await mgmntClient.rules.get({
      id: createdRule.id as string,
    });
    console.log('Got rule:', gotRule.name);

    const { data: gotRules } = await mgmntClient.rules.getAll();
    console.log(
      'Got rules:',
      gotRules.map((x) => x.name)
    );

    const { data: updatedRule } = await mgmntClient.rules.update(
      {
        id: createdRule.id as string,
      },
      { enabled: true }
    );
    console.log(
      'Updated rule enabled:',
      createdRule.name,
      'from',
      createdRule.enabled,
      'to',
      updatedRule.enabled
    );

    await mgmntClient.rules.delete({
      id: createdRule.id as string,
    });
    console.log('Deleted rule:', createdRule.name);
  });

program
  .command('rules-configs')
  .description('Test the rules-configs endpoints')
  .action(async () => {
    const mgmntClient = new ManagementClient(program.opts());

    const { data: rulesConfigs } = await mgmntClient.rulesConfigs.set(
      { key: 'foo' },
      { value: 'bar' }
    );
    console.log('Set rules config:', rulesConfigs.key, 'to', rulesConfigs.value);

    const { data: gotRulesConfigs } = await mgmntClient.rulesConfigs.getAll();
    console.log('Got rules configs:', gotRulesConfigs);

    await mgmntClient.rulesConfigs.delete({ key: rulesConfigs.key });
    console.log('Deleted rules config:', rulesConfigs.key);
  });

program
  .command('stats')
  .description('Test the stats endpoints')
  .action(async () => {
    const mgmntClient = new ManagementClient(program.opts());

    const { data: usersCount } = await mgmntClient.stats.getActiveUsersCount();
    console.log('Got number of active users that logged in during the last 30 days', usersCount);

    const {
      data: [stats],
    } = await mgmntClient.stats.getDaily();
    console.log('Got stats for:', stats.created_at);
  });

program
  .command('tickets')
  .description('Test the tickets endpoints')
  .action(async () => {
    const mgmntClient = new ManagementClient(program.opts());

    const email = `${uuid()}@example.com`;
    const { data: createdUser } = await mgmntClient.users.create({
      email,
      password: uuid(),
      email_verified: true,
      connection: 'Username-Password-Authentication',
    });
    console.log('Created user:', createdUser.user_id);

    const { data: verifyEmailTicket } = await mgmntClient.tickets.verifyEmail({
      user_id: createdUser.user_id as string,
    });
    console.log('Created verify email ticket', verifyEmailTicket.ticket);

    const { data: changePasswordTicket } = await mgmntClient.tickets.changePassword({
      user_id: createdUser.user_id as string,
    });
    console.log('Created verify email ticket', changePasswordTicket.ticket);

    await mgmntClient.users.delete({
      id: createdUser.user_id as string,
    });
    console.log('Deleted user:', createdUser.user_id);
  });

program
  .command('tenants')
  .description('Test the tenants endpoints')
  .action(async () => {
    const opts: ManagementClientOptionsWithClientCredentials = program.opts();
    const mgmntClient = new ManagementClient(opts);

    const { data: tenant } = await mgmntClient.tenants.getSettings();
    console.log('Got setting session_lifetime for', opts.domain, tenant.session_lifetime);

    const { data: updatedTenant } = await mgmntClient.tenants.updateSettings({
      session_lifetime: (tenant.session_lifetime as number) + 1,
    });
    console.log(
      'Updated setting session_lifetime for',
      opts.domain,
      updatedTenant.session_lifetime
    );
    const { data: revertedTenant } = await mgmntClient.tenants.updateSettings({
      session_lifetime: tenant.session_lifetime as number,
    });
    console.log(
      'Reverted setting session_lifetime for',
      opts.domain,
      revertedTenant.session_lifetime
    );
  });

program
  .command('user-blocks')
  .description('Test the user-blocks endpoints')
  .action(async () => {
    const mgmntClient = new ManagementClient(program.opts());

    const email = `${uuid()}@example.com`;
    const { data: createdUser } = await mgmntClient.users.create({
      email,
      password: uuid(),
      email_verified: true,
      connection: 'Username-Password-Authentication',
    });
    console.log('Created user:', createdUser.user_id);

    const { data: userBlock } = await mgmntClient.userBlocks.getAll({ identifier: email });
    console.log('Got user block for:', email, userBlock.blocked_for);

    await mgmntClient.userBlocks.deleteAll({
      identifier: email,
    });
    console.log('Deleted user blocks for:', email);

    const { data: userBlock2 } = await mgmntClient.userBlocks.get({
      id: createdUser.user_id as string,
    });
    console.log('Got user block for:', createdUser.user_id, userBlock2.blocked_for);

    await mgmntClient.userBlocks.delete({
      id: createdUser.user_id as string,
    });
    console.log('Deleted user block for:', createdUser.user_id);

    await mgmntClient.users.delete({
      id: createdUser.user_id as string,
    });
    console.log('Deleted user:', createdUser.user_id);
  });

program
  .command('users')
  .description('Test the users endpoints')
  .action(async () => {
    const mgmntClient = new ManagementClient(program.opts());

    const email = `${uuid()}@example.com`;
    const { data: createdUser } = await mgmntClient.users.create({
      email,
      password: uuid(),
      email_verified: true,
      connection: 'Username-Password-Authentication',
    });
    console.log('Created user:', createdUser.user_id);

    const apiId = `api_${uuid()}`;
    await mgmntClient.resourceServers.create({
      identifier: apiId,
      scopes: [{ value: 'foo' }, { value: 'bar' }],
    });
    const createdApi = (await mgmntClient.resourceServers.getAll()).data.find(
      (api) => api.identifier === apiId
    ) as ResourceServer;
    console.log('Created api:', apiId);

    try {
      const { data: gotUser } = await mgmntClient.users.get({ id: createdUser.user_id as string });
      console.log('Got user:', gotUser.user_id);

      const {
        data: [foundUser],
      } = await mgmntClient.users.getAll({ q: `email:${email}` });
      console.log('Found user:', foundUser.user_id);

      const { data: updatedUser } = await mgmntClient.users.update(
        { id: createdUser.user_id as string },
        { email_verified: false }
      );
      console.log(
        'Updated user.email_verified from:',
        gotUser.email_verified,
        'to',
        updatedUser.email_verified
      );

      const { data: createdAuthMethod } = await mgmntClient.users.createAuthenticationMethod(
        {
          id: updatedUser.user_id as string,
        },
        { type: 'email', email: updatedUser.email, name: 'foo' }
      );
      console.log('Created auth method:', createdAuthMethod.id);

      const { data: createdAuthMethod2 } = await mgmntClient.users.createAuthenticationMethod(
        {
          id: updatedUser.user_id as string,
        },
        { type: 'phone', phone_number: '+12344567890', name: 'foo2' }
      );
      console.log('Created another auth method:', createdAuthMethod2.id);

      const { data: gotAuthMethod } = await mgmntClient.users.getAuthenticationMethod({
        id: updatedUser.user_id as string,
        authentication_method_id: createdAuthMethod.id as string,
      });
      console.log('Got auth method:', gotAuthMethod.id);

      const { data: authMethods } = await mgmntClient.users.getAuthenticationMethods({
        id: updatedUser.user_id as string,
      });
      console.log(
        'Got auth methods:',
        authMethods.map((x) => x.id)
      );

      await mgmntClient.users.updateAuthenticationMethod(
        {
          id: updatedUser.user_id as string,
          authentication_method_id: createdAuthMethod.id as string,
        },
        { name: 'bar' }
      );
      console.log('Updated name on auth method:', createdAuthMethod.name, 'to', 'bar');

      await mgmntClient.users.updateAuthenticationMethods(
        {
          id: updatedUser.user_id as string,
        },
        authMethods.map((authMethod, i) => {
          const { authentication_methods, created_at, confirmed, id, ...props } = authMethod;
          return {
            ...props,
            name: `baz${i}`,
            ...(props.type === 'phone' && { phone_number: '+12344567890' }),
            ...(props.type === 'email' && { email: updatedUser.email }),
          } as PutAuthenticationMethodsRequestInner;
        })
      );
      const { data: updatedAuthMethods } = await mgmntClient.users.getAuthenticationMethods({
        id: updatedUser.user_id as string,
      });
      console.log(
        'Updated all auth methods to names:',
        updatedAuthMethods.map((x) => x.name)
      );

      await mgmntClient.users.deleteAuthenticationMethod({
        id: updatedUser.user_id as string,
        authentication_method_id: updatedAuthMethods[0].id as string,
      });
      console.log('Deleted auth method:', createdAuthMethod.id);

      await mgmntClient.users.deleteAllAuthenticators({
        id: updatedUser.user_id as string,
      });
      console.log('Deleted remaining auth methods:', [createdAuthMethod2.id]);

      const { data: enrollments } = await mgmntClient.users.getEnrollments({
        id: updatedUser.user_id as string,
      });
      console.log('Got enrollments for:', updatedUser.user_id, enrollments);

      const { data: anotherUser } = await mgmntClient.users.create({
        email: `${uuid()}@example.com`,
        password: uuid(),
        email_verified: true,
        connection: 'Username-Password-Authentication',
      });
      console.log('Created another user:', anotherUser.user_id);

      const { id: connectionId } = (await mgmntClient.connections.getAll()).data.find(
        (conn) => conn.name === 'Username-Password-Authentication'
      ) as Connection;
      await mgmntClient.users.link(
        { id: createdUser.user_id as string },
        {
          provider: 'auth0',
          connection_id: connectionId as string,
          user_id: anotherUser.user_id,
        }
      );
      console.log('Linked user:', anotherUser.user_id, 'to', createdUser.user_id);

      await mgmntClient.users.unlink({
        id: createdUser.user_id as string,
        provider: 'auth0',
        user_id: anotherUser.user_id as string,
      });
      console.log('Unlinked users:', anotherUser.user_id, 'from', createdUser.user_id);

      const { data: logEvents } = await mgmntClient.users.getLogs({
        id: createdUser.user_id as string,
        per_page: 2,
      });
      console.log(
        'Got logs for user:',
        createdUser.user_id,
        logEvents.map((log) => log.type)
      );

      await mgmntClient.users.invalidateRememberBrowser({ id: createdUser.user_id as string });
      console.log('Invalidated remembered browser for:', updatedUser.user_id);

      const {
        data: { recovery_code: code },
      } = await mgmntClient.users.regenerateRecoveryCode({
        id: createdUser.user_id as string,
      });
      console.log('Created recovery code for:', createdUser.user_id, code);

      await mgmntClient.users.assignPermissions(
        { id: createdUser.user_id as string },
        { permissions: [{ resource_server_identifier: apiId, permission_name: 'foo' }] }
      );
      console.log('Assigned permission to:', createdUser.user_id, 'foo');

      const { data: permissions } = await mgmntClient.users.getPermissions({
        id: createdUser.user_id as string,
      });
      console.log(
        'Got permissions for:',
        createdUser.user_id,
        permissions.map((p) => p.permission_name)
      );

      await mgmntClient.users.deletePermissions(
        { id: createdUser.user_id as string },
        { permissions: [{ resource_server_identifier: apiId, permission_name: 'foo' }] }
      );
      console.log('Deleted permissions for:', createdUser.user_id, ['foo']);

      const { data: role } = await mgmntClient.roles.create({
        name: uuid(),
      });
      await mgmntClient.users.assignRoles(
        { id: createdUser.user_id as string },
        { roles: [role.id as string] }
      );
      console.log('Assigned role for:', createdUser.user_id, role.id);

      const { data: roles } = await mgmntClient.users.getRoles({
        id: createdUser.user_id as string,
      });
      console.log(
        'Got roles for:',
        createdUser.user_id,
        roles.map((r) => r.name)
      );

      await mgmntClient.users.deleteRoles(
        { id: createdUser.user_id as string },
        { roles: roles.map<string>((r) => r.id as string) }
      );
      console.log(
        'Removed roles for:',
        createdUser.user_id,
        roles.map((r) => r.name)
      );

      await mgmntClient.roles.delete({
        id: role.id as string,
      });
      console.log('Deleted role:', role.id);
    } finally {
      await mgmntClient.users.delete({
        id: createdUser.user_id as string,
      });
      console.log('Deleted user:', createdUser.user_id);
      await mgmntClient.resourceServers.delete({
        id: createdApi.id as string,
      });
      console.log('Deleted api:', createdApi.id);
    }
  });

program
  .command('users-by-email')
  .description('Test the users-by-email endpoints')
  .action(async () => {
    const mgmntClient = new ManagementClient(program.opts());

    const {
      data: [user],
    } = await mgmntClient.users.getAll({ per_page: 1 });

    const {
      data: [userByEmail],
    } = await mgmntClient.usersByEmail.getByEmail({
      email: user.email as string,
    });

    console.log('Found user by email:', userByEmail.email);
  });

await program.parseAsync(process.argv);
