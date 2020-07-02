import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | forums/ideas/index', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:forums/ideas/index');
    assert.ok(route);
  });
});
