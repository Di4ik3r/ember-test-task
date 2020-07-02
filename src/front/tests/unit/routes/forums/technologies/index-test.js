import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | forums/technologies/index', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:forums/technologies/index');
    assert.ok(route);
  });
});
