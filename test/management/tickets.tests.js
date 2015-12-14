var expect = require('chai').expect;
var nock = require('nock');

var SRC_DIR = '../../src';
var API_URL = 'https://tenants.auth0.com';

var TicketsManager = require(SRC_DIR + '/management/TicketsManager');
var ArgumentError = require(SRC_DIR + '/exceptions').ArgumentError;


describe('TicketsManager', function () {
  before(function () {
    this.token = 'TOKEN';
    this.tickets = new TicketsManager({
      headers: { authorization: 'Bearer ' + this.token },
      baseUrl: API_URL
    });
  });


  describe('instance', function () {
    var methods = ['changePassword', 'verifyEmail'];

    methods.forEach(function (method) {
      it('should have a ' + method + ' method', function () {
        expect(this.tickets[method])
          .to.exist
          .to.be.an.instanceOf(Function);
      })
    });
  });


  describe('#constructor', function () {
    it('should error when no options are provided', function () {
      expect(TicketsManager)
        .to.throw(ArgumentError, 'Must provide manager options');
    });


    it('should throw an error when no base URL is provided', function () {
      var manager = TicketsManager.bind(null, {});

      expect(manager)
        .to.throw(ArgumentError, 'Must provide a base URL for the API');
    });


    it('should throw an error when the base URL is invalid', function () {
      var manager = TicketsManager.bind(null, { baseUrl: '' });

      expect(manager)
        .to.throw(ArgumentError, 'The provided base URL is invalid');
    });
  });


  describe('#verifyEmail', function () {
    var data = {
      result_url: "http://myapp.com/callback",
      user_id: ""
    };

    beforeEach(function () {
      this.request = nock(API_URL)
        .post('/tickets/email-verification')
        .reply(200);
    })


    it('should accept a callback', function (done) {
      this
        .tickets
        .verifyEmail(data, function () {
        done();
      });
    });


    it('should return a promise if no callback is given', function (done) {
      this
        .tickets
        .verifyEmail(data)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });


    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('tickets/email-verification')
        .reply(500);

      this
        .tickets
        .verifyEmail(data)
        .catch(function (err) {
          expect(err).to.exist;
          done();
        });
    });


    it('should perform a POST request to /api/v2tickets/email-verification', function (done) {
      var request = this.request;

      this
        .tickets
        .verifyEmail(data)
        .then(function () {
          expect(request.isDone()).to.be.true;
          done();
        });
    });


    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/tickets/email-verification')
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200)

      this
        .tickets
        .verifyEmail({})
        .then(function () {
          expect(request.isDone()).to.be.true;
          done();
        });
    });


    it('should pass the parameters in the query-string', function (done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/tickets/email-verification')
        .query({
          include_fields: true,
          fields: 'test'
        })
        .reply(200)

      this
        .tickets
        .verifyEmail({ include_fields: true, fields: 'test' })
        .then(function () {
          expect(request.isDone())
            .to.be.true;

          done();
        });
    });
  });


  describe('#changePassword', function () {
    var data = {
      result_url: "http://myapp.com/callback",
      user_id: "",
      new_password: "secret",
      connection_id: "con_0000000000000001",
      email: ""
    };


    beforeEach(function () {
      this.request = nock(API_URL)
        .post('/tickets/password-change')
        .reply(200);
    })


    it('should accept a callback', function (done) {
      this
        .tickets
        .changePassword(data, function () {
          done();
        });
    });


    it('should return a promise if no callback is given', function (done) {
      this
        .tickets
        .changePassword(data)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });


    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/tickets/email-verification')
        .reply(500);

      this
        .tickets
        .changePassword(data)
        .catch(function (err) {
          expect(err).to.exist;
          done();
        });
    });


    it('should perform a POST request to /api/v2tickets/email-verification', function (done) {
      var request = this.request;

      this
        .tickets
        .changePassword(data)
        .then(function () {
          expect(request.isDone()).to.be.true;
          done();
        });
    });


    it('should pass the data in the body of the request', function (done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/tickets/password-change', data)
        .reply(200);

      this
        .tickets
        .changePassword(data)
        .then(function () {
          expect(request.isDone())
            .to.be.true;

          done();
        });
    });


    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/tickets/password-change')
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200)

      this
        .tickets
        .changePassword(data)
        .then(function () {
          expect(request.isDone()).to.be.true;
          done();
        });
    });
  });

});
