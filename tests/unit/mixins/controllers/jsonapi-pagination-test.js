import {
  test
} from 'ember-qunit';

import {
  module
} from 'qunit';

import Ember from 'ember';
import PaginationMixin from 'ember-cli-jsonapi-pagination/mixins/controllers/jsonapi-pagination';

module('mixins:controllers/jsonapi-pagination');

test('it has size and number query params with default values: 15 and 1 accordingly', function(assert) {
  assert.expect(3);

  let extendable = Ember.Object.extend(PaginationMixin).create();

  assert.deepEqual(extendable.get('queryParams'), ['size', 'number']);
  assert.equal(extendable.get('size'), 15);
  assert.equal(extendable.get('number'), 1);
});

test('setCurrentPage sets number property to be equal to the specified page number', function(assert) {
  assert.expect(2);

  let extendable;

  Ember.run(() => {
    extendable = Ember.Object.extend(PaginationMixin).create();
  });

  assert.equal(extendable.get('number'), 1);

  Ember.run(() => {
    extendable.get('actions').setCurrentPage.call(extendable, 5);
  });

  assert.equal(extendable.get('number'), 5);
});


test('setCurrentSize sets size property to be equal to the specified size', function(assert) {
  assert.expect(2);

  let extendable = Ember.Object.extend(PaginationMixin).create();

  assert.equal(extendable.get('size'), 15);

  Ember.run(() => {
    extendable.get('actions').setCurrentSize.call(extendable, 20);
  });

  assert.equal(extendable.get('size'), 20);
});
