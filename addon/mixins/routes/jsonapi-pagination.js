import Ember from 'ember';

export default Ember.Mixin.create({
  queryParams: {
    size: {
      refreshModel: true
    },
    number: {
      refreshModel: true
    }
  },

  queryPaginated: function(modelName, params) {
    this.resolveParamsForPagination(params);
    return this.store.query(modelName, params);
  },

  resolveParamsForPagination: function(params) {
    params.page = { number: params.number, size: params.size };

    delete params.number;
    delete params.size;
  }
});
