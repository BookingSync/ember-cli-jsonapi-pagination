import Ember from 'ember';
import Pagination from 'ember-cli-jsonapi-pagination/mixins/routes/jsonapi-pagination';

export default Ember.Route.extend(Pagination, {
  model(params) {
    return this.queryPaginated('rental', params);
  }
});
