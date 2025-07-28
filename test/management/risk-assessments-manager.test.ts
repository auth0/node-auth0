import {
  RiskAssessmentsManager,
  ManagementClient,
  UpdateRiskAssessmentsSettingsRequestContent,
  UpdateRiskAssessmentsSettingsNewDeviceRequestContent,
} from '../../src/index.js';

import { checkMethod } from './tests.util.js';

const DOMAIN = `tenant.auth0.com`;
const token = 'TOKEN';

describe('RiskAssessmentsManager', () => {
  const riskAssessmentsManager: RiskAssessmentsManager = new ManagementClient({
    domain: DOMAIN,
    token,
  }).riskAssessments;

  describe('getSetting', () => {
    const operation = riskAssessmentsManager.getSettings();
    const uri = `/risk-assessments/settings`;
    const method = 'get';

    checkMethod({ operation, uri, method });
  });

  describe('updateSettings', () => {
    const requestBody: UpdateRiskAssessmentsSettingsRequestContent = {
      enabled: true,
    };
    const operation = riskAssessmentsManager.updateSettings(requestBody);
    const uri = `/risk-assessments/settings`;
    const method = 'patch';

    checkMethod({ operation, uri, method });
  });

  describe('getNewDeviceSettings', () => {
    const operation = riskAssessmentsManager.getNewDeviceSettings();
    const uri = `/risk-assessments/settings/new-device`;
    const method = 'get';

    checkMethod({ operation, uri, method });
  });

  describe('updateNewDeviceSettings', () => {
    const requestParameters: UpdateRiskAssessmentsSettingsNewDeviceRequestContent = {
      remember_for: 10,
    };
    const operation = riskAssessmentsManager.updateNewDeviceSettings(requestParameters);
    const uri = `/risk-assessments/settings/new-device`;
    const method = 'patch';

    checkMethod({ operation, uri, method });
  });
});
