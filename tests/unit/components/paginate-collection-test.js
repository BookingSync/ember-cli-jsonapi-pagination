import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('paginate-collection', {
  unit: true
});

test('it sets currentPageToBeSet from currentPage on setUp', function(assert) {
  let component = this.subject({setCurrentPage: 'setCurrentPage', currentPage: 10});

  assert.equal(component.get('currentPageToBeSet'), 10);
});

test('shouldDisplayPaginator returns true if the totalPages is greater than 1', function(assert) {
  let component = this.subject({totalPages: 10});

  assert.ok(component.get('shouldDisplayPaginator'));

  component.set('totalPages', 1);

  assert.ok(!component.get('shouldDisplayPaginator'));
});

test('hasPreviousPage returns true if the totalPages is greater than 1 and currentPage is not the first page', function(assert) {
  let component = this.subject({totalPages: 10, currentPage: 2});

  assert.ok(component.get('hasPreviousPage'));

  component.set('currentPage', 1);

  assert.ok(!component.get('hasPreviousPage'));

  component.set('currentPage', 2);

  assert.ok(component.get('hasPreviousPage'));

  component.set('totalPages', 1);

  assert.ok(!component.get('hasPreviousPage'));
});

test('hasNextPage returns true if the totalPages is greater than 1 and currentPage is not the last page', function(assert) {
  let component = this.subject({totalPages: 10, currentPage: 2});

  assert.ok(component.get('hasNextPage'));

  component.set('currentPage', 10);

  assert.ok(!component.get('hasNextPage'));

  component.set('currentPage', 2);

  assert.ok(component.get('hasNextPage'));

  component.set('totalPages', 1);

  assert.ok(!component.get('hasNextPage'));
});
