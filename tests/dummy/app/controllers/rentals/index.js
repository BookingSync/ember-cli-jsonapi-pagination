import Ember from 'ember';
import Pagination from 'ember-cli-jsonapi-pagination/mixins/controllers/jsonapi-pagination';

export default Ember.Controller.extend(Pagination, {
  size: 5,

  totalPages: Ember.computed('size', 'number', 'model.[]', function() {
    return this.get('model.meta.total-pages');
  })
});
