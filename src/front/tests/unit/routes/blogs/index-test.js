import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | blogs/index', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:blogs/index');
    assert.ok(route);
  });
});
