import nock from 'nock';
import { beforeAll, afterAll } from '@jest/globals';
import { UserInfoClient } from '../../src/index.js';

const { back: nockBack } = nock;

const opts = {
  domain: 'test-domain.auth0.com',
};

describe('Users', () => {
  let nockDone: () => void;

  beforeAll(async () => {
    ({ nockDone } = await nockBack('userinfo/fixtures/userinfo.json'));
  });

  afterAll(() => {
    nockDone();
  });

  describe('#getUserInfo', () => {
    it('should get the user info', async () => {
      const users = new UserInfoClient(opts);
      const accessToken = 'MY_TOKEN';
      const { data } = await users.getUserInfo(accessToken);

      expect(data).toEqual(
        expect.objectContaining({
          sub: '248289761001',
        })
      );
    });

    it('should use the provided access token', async () => {
      const scope = nock('https://test-domain.auth0.com')
        .get('/userinfo')
        .matchHeader('Authorization', `Bearer MY_TOKEN`)
        .reply(200, {});

      const users = new UserInfoClient(opts);
      const accessToken = 'MY_TOKEN';
      await users.getUserInfo(accessToken);

      expect(scope.isDone()).toBeTruthy();
    });
  });
});
