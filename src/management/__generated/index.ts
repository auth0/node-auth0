export * from './managers/index.js';
export * from './models/index.js';

import {
  ActionsManager,
  AnomalyManager,
  AttackProtectionManager,
  BlacklistsManager,
  BrandingManager,
  ClientGrantsManager,
  ClientsManager,
  ConnectionsManager,
  CustomDomainsManager,
  DeviceCredentialsManager,
  EmailTemplatesManager,
  EmailsManager,
  FlowsManager,
  FormsManager,
  GrantsManager,
  GuardianManager,
  HooksManager,
  JobsManager,
  KeysManager,
  LogStreamsManager,
  LogsManager,
  OrganizationsManager,
  PromptsManager,
  RefreshTokensManager,
  ResourceServersManager,
  RolesManager,
  RulesManager,
  RulesConfigsManager,
  SelfServiceProfilesManager,
  SessionsManager,
  StatsManager,
  TenantsManager,
  TicketsManager,
  UserBlocksManager,
  UsersManager,
  UsersByEmailManager,
} from './managers/index.js';

import { Configuration } from '../../lib/runtime.js';

export abstract class ManagementClientBase {
  public readonly actions = new ActionsManager(this.configuration);
  public readonly anomaly = new AnomalyManager(this.configuration);
  public readonly attackProtection = new AttackProtectionManager(this.configuration);
  public readonly blacklists = new BlacklistsManager(this.configuration);
  public readonly branding = new BrandingManager(this.configuration);
  public readonly clientGrants = new ClientGrantsManager(this.configuration);
  public readonly clients = new ClientsManager(this.configuration);
  public readonly connections = new ConnectionsManager(this.configuration);
  public readonly customDomains = new CustomDomainsManager(this.configuration);
  public readonly deviceCredentials = new DeviceCredentialsManager(this.configuration);
  public readonly emailTemplates = new EmailTemplatesManager(this.configuration);
  public readonly emails = new EmailsManager(this.configuration);
  public readonly flows = new FlowsManager(this.configuration);
  public readonly forms = new FormsManager(this.configuration);
  public readonly grants = new GrantsManager(this.configuration);
  public readonly guardian = new GuardianManager(this.configuration);
  public readonly hooks = new HooksManager(this.configuration);
  public readonly jobs = new JobsManager(this.configuration);
  public readonly keys = new KeysManager(this.configuration);
  public readonly logStreams = new LogStreamsManager(this.configuration);
  public readonly logs = new LogsManager(this.configuration);
  public readonly organizations = new OrganizationsManager(this.configuration);
  public readonly prompts = new PromptsManager(this.configuration);
  public readonly refreshTokens = new RefreshTokensManager(this.configuration);
  public readonly resourceServers = new ResourceServersManager(this.configuration);
  public readonly roles = new RolesManager(this.configuration);
  public readonly rules = new RulesManager(this.configuration);
  public readonly rulesConfigs = new RulesConfigsManager(this.configuration);
  public readonly selfServiceProfiles = new SelfServiceProfilesManager(this.configuration);
  public readonly sessions = new SessionsManager(this.configuration);
  public readonly stats = new StatsManager(this.configuration);
  public readonly tenants = new TenantsManager(this.configuration);
  public readonly tickets = new TicketsManager(this.configuration);
  public readonly userBlocks = new UserBlocksManager(this.configuration);
  public readonly users = new UsersManager(this.configuration);
  public readonly usersByEmail = new UsersByEmailManager(this.configuration);

  constructor(protected configuration: Configuration) {}
}
