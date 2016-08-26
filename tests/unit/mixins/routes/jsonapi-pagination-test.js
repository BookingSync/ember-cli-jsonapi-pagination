import {
  test
} from 'ember-qunit';

import {
  module
} from 'qunit';

import Ember from 'ember';
import PaginationMixin from 'ember-cli-jsonapi-pagination/mixins/routes/jsonapi-pagination';

module('mixins:routes/jsonapi-pagination');

test('it has queryParams with size and number set to refresh model', function(assert) {
  assert.expect(3);

  let extendable = Ember.Object.extend(PaginationMixin).create();

  assert.deepEqual(Object.keys(extendable.get('queryParams')), ['size', 'number']);
  assert.deepEqual(extendable.get('queryParams.size'), { refreshModel: true });
  assert.deepEqual(extendable.get('queryParams.number'), { refreshModel: true });
});


test('queryPaginated calls #query on store with model name and formatted params', function(assert) {
  assert.expect(2);

  let calledModelName, calledParams;

  let extendable = Ember.Object.extend(PaginationMixin).create();
  let storeStub = Ember.Object.extend({
    query: function(modelName, params) {
      calledModelName = modelName;
      calledParams = params;
    }
  }).create();

  Ember.run(() => {
    extendable.set('store', storeStub);
  });

  let params = { size: 10, number: 1 };
  extendable.queryPaginated('user', params);

  assert.deepEqual(calledParams, { page: { size: 10, number: 1 } });
  assert.equal(calledModelName, 'user');
});

test('resolveParamsForPagination formats params to be compliant with jsonapi', function(assert) {
  assert.expect(1);

  let params = { size: 10, number: 1 };
  let extendable = Ember.Object.extend(PaginationMixin).create();

  extendable.resolveParamsForPagination(params);
  assert.deepEqual(params, { page: { size: 10, number: 1 } });
});


