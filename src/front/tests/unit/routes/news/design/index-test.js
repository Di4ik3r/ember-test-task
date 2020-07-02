import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | news/design/index', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:news/design/index');
    assert.ok(route);
  });
});
