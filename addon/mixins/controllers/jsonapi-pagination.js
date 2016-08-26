import Ember from 'ember';

export default Ember.Mixin.create({
  size: 15,
  number: 1,
  queryParams: ['size', 'number'],

  actions: {
    setCurrentPage: function(currentPage) {
      this.set('number', currentPage);
    },

    setCurrentSize: function(currentSize) {
      this.set('size', currentSize);
    }
  }
});
