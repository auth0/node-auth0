import { HttpResponseHeadersUtils } from '../../src/lib/httpResponseHeadersUtils.js';

describe('HttpResponseHeadersUtils', () => {
  describe('getClientQuotaLimit', () => {
    it('should return a valid TokenQuotaBucket when auth0-client-quota-limit header is present', () => {
      const headers = {
        'auth0-client-quota-limit': 'per_hour;q=100;r=50;t=3600,per_day;q=1000;r=500;t=86400',
      };
      const result = HttpResponseHeadersUtils.getClientQuotaLimit(headers);
      expect(result).toEqual({
        perHour: { quota: 100, remaining: 50, resetAfter: 3600 },
        perDay: { quota: 1000, remaining: 500, resetAfter: 86400 },
      });
    });

    it('should return null when no relevant headers are present', () => {
      const headers = { 'some-other-header': 'value' };
      const result = HttpResponseHeadersUtils.getClientQuotaLimit(headers);
      expect(result).toBeNull();
    });
  });

  describe('getOrganizationQuotaLimit', () => {
    it('should return a valid TokenQuotaBucket when auth0-organization-quota-limit header is present', () => {
      const headers = { 'auth0-organization-quota-limit': 'per_hour;q=200;r=150;t=3600' };
      const result = HttpResponseHeadersUtils.getOrganizationQuotaLimit(headers);
      expect(result).toEqual({
        perHour: { quota: 200, remaining: 150, resetAfter: 3600 },
        perDay: undefined,
      });
    });

    it('should return null when no relevant headers are present', () => {
      const headers = { 'some-other-header': 'value' };
      const result = HttpResponseHeadersUtils.getOrganizationQuotaLimit(headers);
      expect(result).toBeNull();
    });
  });

  describe('parseQuota', () => {
    it('should correctly parse a token quota string into a TokenQuotaBucket', () => {
      const tokenQuota = 'per_hour;q=300;r=250;t=3600,per_day;q=3000;r=2500;t=86400';
      const result = HttpResponseHeadersUtils['parseQuota'](tokenQuota);
      expect(result).toEqual({
        perHour: { quota: 300, remaining: 250, resetAfter: 3600 },
        perDay: { quota: 3000, remaining: 2500, resetAfter: 86400 },
      });
    });

    it('should handle missing attributes gracefully', () => {
      const tokenQuota = 'per_hour;q=300;r=250';
      const result = HttpResponseHeadersUtils['parseQuota'](tokenQuota);
      expect(result).toEqual({
        perHour: { quota: 300, remaining: 250, resetAfter: 0 },
        perDay: undefined,
      });
    });

    it('should return an empty TokenQuotaBucket for invalid input', () => {
      const tokenQuota = 'invalid_format';
      const result = HttpResponseHeadersUtils['parseQuota'](tokenQuota);
      expect(result).toEqual({ perHour: undefined, perDay: undefined });
    });
  });
});
