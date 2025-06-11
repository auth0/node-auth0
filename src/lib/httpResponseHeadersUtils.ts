export interface TokenQuotaLimit {
  quota: number;
  remaining: number;
  resetAfter: number;
}

export interface TokenQuotaBucket {
  perHour?: TokenQuotaLimit;
  perDay?: TokenQuotaLimit;
}

export class HttpResponseHeadersUtils {
  /**
   * Gets the client token quota limits from the provided headers.
   *
   * @param headers the HTTP response headers.
   * @return a TokenQuotaBucket containing client rate limits, or null if not present.
   */
  static getClientQuotaLimit(headers: Headers | Record<string, string>): TokenQuotaBucket | null {
    const getHeaderValue = (key: string): string | null => {
      if (headers instanceof Headers) {
        return headers.get(key);
      }
      return headers[key] || null;
    };

    const quotaHeader = getHeaderValue('auth0-client-quota-limit');
    return quotaHeader ? this.parseQuota(quotaHeader) : null;
  }

  /**
   * Gets the organization token quota limits from the provided headers.
   *
   * @param headers the HTTP response headers.
   * @return a TokenQuotaBucket containing organization rate limits, or null if not present.
   */
  static getOrganizationQuotaLimit(
    headers: Headers | Record<string, string>
  ): TokenQuotaBucket | null {
    const getHeaderValue = (key: string): string | null => {
      if (headers instanceof Headers) {
        return headers.get(key);
      }
      return headers[key] || null;
    };

    const quotaHeader = getHeaderValue('auth0-organization-quota-limit');
    return quotaHeader ? this.parseQuota(quotaHeader) : null;
  }

  /**
   * Parses a token quota string into a TokenQuotaBucket.
   *
   * @param tokenQuota the token quota string.
   * @return a TokenQuotaBucket containing parsed rate limits.
   */
  private static parseQuota(tokenQuota: string): TokenQuotaBucket {
    let perHour: TokenQuotaLimit | undefined;
    let perDay: TokenQuotaLimit | undefined;

    const parts = tokenQuota.split(',');
    for (const part of parts) {
      const attributes = part.split(';');
      let quota = 0,
        remaining = 0,
        resetAfter = 0;

      for (const attribute of attributes) {
        const [key, value] = attribute.split('=').map((s) => s.trim());
        if (!key || !value) continue;

        switch (key) {
          case 'q':
            quota = parseInt(value, 10);
            break;
          case 'r':
            remaining = parseInt(value, 10);
            break;
          case 't':
            resetAfter = parseInt(value, 10);
            break;
        }
      }

      if (attributes.length > 0 && attributes[0].includes('per_hour')) {
        perHour = { quota, remaining, resetAfter };
      } else if (attributes.length > 0 && attributes[0].includes('per_day')) {
        perDay = { quota, remaining, resetAfter };
      }
    }

    return { perHour, perDay };
  }
}
