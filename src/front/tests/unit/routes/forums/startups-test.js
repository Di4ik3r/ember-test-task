import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | forums/startups', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:forums/startups');
    assert.ok(route);
  });
});
