import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | forums/index', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:forums/index');
    assert.ok(route);
  });
});
