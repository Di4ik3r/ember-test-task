import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | news/design/post', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:news/design/post');
    assert.ok(route);
  });
});
