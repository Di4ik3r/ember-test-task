import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | forums/ideas/post', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:forums/ideas/post');
    assert.ok(route);
  });
});
