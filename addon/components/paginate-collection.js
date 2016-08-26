import Ember from 'ember';

let PageObject = Ember.Object;

export default Ember.Component.extend({
  outerWindow: 3,

  setup: Ember.on('init', function() {
    this.set('currentPageToBeSet', this.get('currentPage'));
  }),

  shouldDisplayPaginator: Ember.computed('totalPages', function() {
    return Number(this.get('totalPages')) > 1;
  }),

  hasPreviousPage: Ember.computed('currentPage', 'totalPages', function() {
    let totalPages = this.get('totalPages');
    let currentPage = this.get('currentPage');
    return Number(currentPage) !== 1 && Number(totalPages) > 1;
  }),

  hasNextPage: Ember.computed('currentPage', 'totalPages', function() {
    let totalPages = this.get('totalPages');
    let currentPage = this.get('currentPage');
    return Number(currentPage) !== Number(totalPages) && Number(totalPages) > 1;
  }),

  pageObjects: Ember.computed('totalPages', 'currentPage', function() {
    let totalPages = this.get('totalPages');
    let currentPage = this.get('currentPage');
    let pages = Ember.A([]);
    let outerWindow = Number(this.get('outerWindow'));
    let leftDotsDisplayed = false;
    let rightDotsDisplayed = false;

    let i = 1;

    while (i <= totalPages) {
      let shouldDisplay, displayAsDots, isCurrentPage;

      if (i === currentPage) {
        isCurrentPage = true;
      } else {
        isCurrentPage = false;
      }

      if (shouldConsiderOuterWindowSettings(totalPages, outerWindow)) {
        if (isCurrentPage) {
          shouldDisplay = true;
          displayAsDots = false;
        } else if ((i <= outerWindow + 1) || (totalPages - i) <= outerWindow) {
          shouldDisplay = true;
          displayAsDots = false;
        } else if ((i === currentPage - 1) || (i === currentPage  + 1)) {
          shouldDisplay = true;
          displayAsDots = false;
        } else if (i < currentPage && !leftDotsDisplayed) {
          leftDotsDisplayed = true;
          shouldDisplay = true;
          displayAsDots = true;
        } else if (i > currentPage && !rightDotsDisplayed) {
          rightDotsDisplayed = true;
          shouldDisplay = true;
          displayAsDots = true;
        } else {
          shouldDisplay = false;
          displayAsDots = false;
        }
      } else {
        shouldDisplay = true;
        displayAsDots = false;
      }

      pages.pushObject(PageObject.create({
          value: i,
          isCurrentPage: isCurrentPage,
          shouldDisplay: shouldDisplay,
          displayAsDots: displayAsDots,
        })
      );
      i++;
    }

    return pages;
  }),

  actions: {
    setCurrentPage(pageNumber) {
      this.set('currentPage', pageNumber);
      if (this.attrs.setCurrentPage) {
        this.attrs.setCurrentPage(this.get('currentPage'));
      }
    },

    nextPage() {
      let currentPage = this.get('currentPage');
      this.set('currentPage', currentPage + 1);
      if (this.attrs.setCurrentPage) {
        this.attrs.setCurrentPage(this.get('currentPage'));
      }
    },

    previousPage() {
      let currentPage = this.get('currentPage');
      this.set('currentPage', currentPage - 1);
      if (this.attrs.setCurrentPage) {
        this.attrs.setCurrentPage(this.get('currentPage'));
      }
    }
  }
});

function shouldConsiderOuterWindowSettings(totalPages, outerWindow) {
  let firstPageContribution = 1;
  let lastPageContribution = 1;
  let extraCurrentPageContribution = 1;

  return totalPages > outerWindow * 2 + firstPageContribution + lastPageContribution + extraCurrentPageContribution;
}


