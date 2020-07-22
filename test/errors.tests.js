var expect = require('chai').expect;

var errors = require('../src/errors');

describe('Errors', function() {
  describe('sanitizeErrorRequestData', function() {
    describe('when passed in error is missing request data and headers', function() {
      var error = { response: { request: {} } };
      var sanitizedError = errors.sanitizeErrorRequestData(error);

      it('should return error', function() {
        expect(sanitizedError).to.equal(error);
      });
    });

    describe('when passed in error has request data', function() {
      const error = {
        response: {
          request: {
            _data: {
              DATA_SECRET: 'secret',
              USER_PASSWORD: 'password',
              USER_NAME: 'username'
            }
          }
        }
      };
      const sanitizedError = errors.sanitizeErrorRequestData(error);
      const sanitizedData = sanitizedError.response.request._data;

      it('should return [REDACTED] for DATA_SECRET', function() {
        expect(sanitizedData.DATA_SECRET).to.equal('[REDACTED]');
      });
      it('should return [REDACTED] for DATA_SECRET', function() {
        expect(sanitizedData.DATA_SECRET).to.equal('[REDACTED]');
      });
      it('should return original value for USER_NAME', function() {
        expect(sanitizedData.USER_NAME).to.equal(sanitizedData.USER_NAME);
      });
    });

    describe('when passed in error has header data', function() {
      const error = {
        response: {
          request: {
            _header: {
              authorization: 'Bearer xyz'
            }
          }
        }
      };
      const sanitizedError = errors.sanitizeErrorRequestData(error);
      const sanitizedData = sanitizedError.response.request._header;

      it('should return [REDACTED] for authorization', function() {
        expect(sanitizedData.authorization).to.equal('[REDACTED]');
      });
    });
  });

  describe('SanitizedError', function() {
    var name = 'ErrorName';
    var message = 'message';
    var status = 500;
    var requestInfo = { keyA: 'a', keyB: 'b' };
    var originalError = { response: { request: { _data: { secret: 'secretpassword' } } } };
    var sanitizedError = new errors.SanitizedError(
      name,
      message,
      status,
      requestInfo,
      originalError
    );

    it('should be an instance of the builtin Error', function() {
      expect(sanitizedError).to.be.an.instanceof(Error);
    });

    it('should be an instance of its class', function() {
      expect(sanitizedError).to.be.an.instanceof(errors.SanitizedError);
    });

    it('should have a name', function() {
      expect(sanitizedError.name).to.eql(name);
    });

    it('should have a message', function() {
      expect(sanitizedError.message).to.eql(message);
    });

    it('should have a statusCode', function() {
      expect(sanitizedError.statusCode).to.eql(status);
    });

    it('should have request info', function() {
      expect(sanitizedError.requestInfo).to.deep.eql(requestInfo);
    });

    it('should have the original error', function() {
      expect(sanitizedError.originalError).to.eql(originalError);
    });

    it('should sanitize the original error sensitive information', function() {
      expect(sanitizedError.originalError.response.request._data.secret).to.eql('[REDACTED]');
    });

    it('should have a stack with the message and location the error was created', function() {
      expect(sanitizedError.stack).to.exist;
    });
  });
});
