const { expect } = require('chai');
const nock = require('nock');

const API_URL = 'https://tenants.auth0.com';

const MigrationsManager = require(`../../src/management/MigrationsManager`);
const { ArgumentError } = require('rest-facade');

describe('MigrationsManager', () => {
  before(function () {
    this.token = 'TOKEN';
    this.migrations = new MigrationsManager({
      headers: { authorization: `Bearer ${this.token}` },
      baseUrl: API_URL,
    });
  });

  describe('instance', () => {
    const methods = ['updateMigrations', 'getMigrations'];

    methods.forEach((method) => {
      it(`should have a ${method} method`, function () {
        expect(this.migrations[method]).to.exist.to.be.an.instanceOf(Function);
      });
    });
  });

  describe('#constructor', () => {
    it('should error when no options are provided', () => {
      expect(() => {
        new MigrationsManager();
      }).to.throw(ArgumentError, 'Must provide manager options');
    });

    it('should throw an error when no base URL is provided', () => {
      expect(() => {
        new MigrationsManager({});
      }).to.throw(ArgumentError, 'Must provide a base URL for the API');
    });

    it('should throw an error when the base URL is invalid', () => {
      expect(() => {
        new MigrationsManager({ baseUrl: '' });
      }).to.throw(ArgumentError, 'The provided base URL is invalid');
    });
  });

  describe('#getMigrations', () => {
    beforeEach(function () {
      this.request = nock(API_URL).get('/migrations').reply(200);
    });

    it('should accept a callback', function (done) {
      this.migrations.getMigrations(() => {
        done();
      });
    });

    it('should return a promise if no callback is given', function (done) {
      this.migrations.getMigrations().then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get('/migrations').reply(500);

      this.migrations.getMigrations().catch((err) => {
        expect(err).to.exist;
        done();
      });
    });

    it('should pass the body of the response to the "then" handler', function (done) {
      nock.cleanAll();

      const data = { flags: { migration_flag: true } };
      nock(API_URL).get('/migrations').reply(200, data);

      this.migrations.getMigrations().then((migrations) => {
        expect(migrations).to.be.an('object');

        expect(migrations).to.have.nested.property('flags.migration_flag', true);

        done();
      });
    });

    it('should perform a GET request to /api/v2/migrations', function (done) {
      const { request } = this;

      this.migrations.getMigrations().then(() => {
        expect(request.isDone()).to.be.true;
        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/migrations')
        .matchHeader('Authorization', `Bearer ${this.token}`)
        .reply(200);

      this.migrations.getMigrations().then(() => {
        expect(request.isDone()).to.be.true;
        done();
      });
    });

    it('should pass the parameters in the query-string', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/migrations')
        .query({
          any: 'test',
        })
        .reply(200);

      this.migrations.getMigrations({ any: 'test' }).then(() => {
        expect(request.isDone()).to.be.true;
        done();
      });
    });
  });

  describe('#updateMigrations', () => {
    const data = {
      flags: {
        migration: false,
      },
    };

    beforeEach(function () {
      this.request = nock(API_URL).patch('/migrations').reply(200);
    });

    it('should accept a callback', function (done) {
      this.migrations.updateMigrations(data, () => {
        done();
      });
    });

    it('should return a promise if no callback is given', function (done) {
      this.migrations
        .updateMigrations(data)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).patch('/migrations').reply(500);

      this.migrations.updateMigrations(data).catch((err) => {
        expect(err).to.exist;
        done();
      });
    });

    it('should perform a PATCH request to /api/v2migrations', function (done) {
      const { request } = this;

      this.migrations.updateMigrations(data).then(() => {
        expect(request.isDone()).to.be.true;
        done();
      });
    });

    it('should pass the data in the body of the request', function (done) {
      nock.cleanAll();

      const request = nock(API_URL).patch('/migrations', data).reply(200);

      this.migrations.updateMigrations(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass the body of the response to the "then" handler', function (done) {
      nock.cleanAll();

      const result = { flags: { migration_flag: true } };
      nock(API_URL).patch('/migrations').reply(200, result);

      this.migrations.updateMigrations(data).then((migrations) => {
        expect(migrations).to.be.an('object');

        expect(migrations).to.have.nested.property('flags.migration_flag', true);

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .patch('/migrations')
        .matchHeader('Authorization', `Bearer ${this.token}`)
        .reply(200);

      this.migrations.updateMigrations(data).then(() => {
        expect(request.isDone()).to.be.true;
        done();
      });
    });
  });
});
