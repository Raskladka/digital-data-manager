import assert from 'assert';
import Storage from './../src/Storage.js';
import DDStorage from './../src/DDStorage.js';

describe('DDStorage', () => {

  let _digitalData;
  let _storage = new Storage();
  let _ddStorage;

  describe('#persist', () => {

    beforeEach(() => {
      _digitalData = {
        user: {
          isSubscribed: true,
          email: 'test@email.com',
          temp: 'test'
        }
      };
      _ddStorage = new DDStorage(_digitalData,  _storage);
    });

    afterEach(() => {
      window.localStorage.clear();
      _ddStorage.clear();
      _ddStorage = undefined;
    });

    it('should persist fields with and without exp dates', (done) => {
      _ddStorage.persist('user.isSubscribed');
      _ddStorage.persist('user.email', 1);
      _ddStorage.persist('user.temp', 0.01);

      assert.deepEqual(_ddStorage.getPersistedKeys(), [
        'user.isSubscribed',
        'user.email',
        'user.temp'
      ]);
      assert.ok(_ddStorage.get('user.isSubscribed'));
      assert.ok(_ddStorage.get('user.email'));
      assert.ok(_ddStorage.get('user.temp'));

      setTimeout(() => {
        assert.ok(_ddStorage.get('user.isSubscribed'));
        assert.ok(_ddStorage.get('user.email'));
        assert.ok(!_ddStorage.get('user.temp'));
        assert.deepEqual(_ddStorage.getPersistedKeys(), [
          'user.isSubscribed',
          'user.email'
        ]);
        done();
      }, 110);
    });

  });

});
