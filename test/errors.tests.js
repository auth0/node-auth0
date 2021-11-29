const { expect } = require('chai');

const errors = require('../src/errors');

describe('Errors', () => {
  describe('sanitizeErrorRequestData', () => {
    describe('when passed in error is missing request data and headers', () => {
      const error = { response: { request: {} } };
      const redactedError = errors.sanitizeErrorRequestData(error);

      it('should return error', () => {
        expect(redactedError).to.equal(error);
      });
    });

    describe('when passed in error has request data', () => {
      const error = {
        response: {
          request: {
            _data: {
              DATA_SECRET: 'secret',
              USER_PASSWORD: 'password',
              USER_NAME: 'username',
            },
          },
        },
      };
      const redactedError = errors.sanitizeErrorRequestData(error);
      const sanitizedData = redactedError.response.request._data;

      it('should return [REDACTED] for DATA_SECRET', () => {
        expect(sanitizedData.DATA_SECRET).to.equal('[REDACTED]');
      });
      it('should return [REDACTED] for DATA_SECRET', () => {
        expect(sanitizedData.DATA_SECRET).to.equal('[REDACTED]');
      });
      it('should return original value for USER_NAME', () => {
        expect(sanitizedData.USER_NAME).to.equal(sanitizedData.USER_NAME);
      });
    });

    describe('when passed in error has header data', () => {
      const error = {
        response: {
          request: {
            _header: {
              authorization: 'Bearer xyz',
            },
          },
        },
      };
      const redactedError = errors.sanitizeErrorRequestData(error);
      const sanitizedData = redactedError.response.request._header;

      it('should return [REDACTED] for authorization', () => {
        expect(sanitizedData.authorization).to.equal('[REDACTED]');
      });
    });
  });

  describe('SanitizedError', () => {
    const name = 'ErrorName';
    const message = 'message';
    const status = 500;
    const requestInfo = { keyA: 'a', keyB: 'b' };
    const originalError = { response: { request: { _data: { secret: 'secretpassword' } } } };
    const sanitizedError = new errors.SanitizedError(
      name,
      message,
      status,
      requestInfo,
      originalError
    );

    it('should be an instance of the builtin Error', () => {
      expect(sanitizedError).to.be.an.instanceof(Error);
    });

    it('should be an instance of its class', () => {
      expect(sanitizedError).to.be.an.instanceof(errors.SanitizedError);
    });

    it('should have a name', () => {
      expect(sanitizedError.name).to.eql(name);
    });

    it('should have a message', () => {
      expect(sanitizedError.message).to.eql(message);
    });

    it('should have a statusCode', () => {
      expect(sanitizedError.statusCode).to.eql(status);
    });

    it('should have request info', () => {
      expect(sanitizedError.requestInfo).to.deep.eql(requestInfo);
    });

    it('should have the original error', () => {
      expect(sanitizedError.originalError).to.eql(originalError);
    });

    it('should redact the original error sensitive information', () => {
      expect(sanitizedError.originalError.response.request._data.secret).to.eql('[REDACTED]');
    });

    it('should have a stack with the message and location the error was created', () => {
      expect(sanitizedError.stack).to.exist;
    });
  });
});
