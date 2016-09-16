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
    let pageStartAtValue = 1;
    let pageEndAtValue = totalPages;
    let pageValues = extractPageValues(outerWindow, currentPage, pageStartAtValue, pageEndAtValue);

    pageValues.forEach((page) => {
      let shouldDisplay, displayAsDots, isCurrentPage;

      if (page === currentPage) {
        isCurrentPage = true;
      } else {
        isCurrentPage = false;
      }

      if (shouldConsiderOuterWindowSettings(totalPages, outerWindow)) {
        if (isCurrentPage) {
          shouldDisplay = true;
          displayAsDots = false;
        } else if (isWithinOuterWindowLimit(outerWindow, totalPages, page)) {
          shouldDisplay = true;
          displayAsDots = false;
        } else if (isAdjacentToCurrentPage(currentPage, page)) {
          shouldDisplay = true;
          displayAsDots = false;
        } else if (page < currentPage && !leftDotsDisplayed) {
          leftDotsDisplayed = true;
          shouldDisplay = true;
          displayAsDots = true;
        } else if (page > currentPage && !rightDotsDisplayed) {
          rightDotsDisplayed = true;
          shouldDisplay = true;
          displayAsDots = true;
        }
      } else {
        shouldDisplay = true;
        displayAsDots = false;
      }

      pages.pushObject(PageObject.create({
          value: page,
          isCurrentPage: isCurrentPage,
          shouldDisplay: shouldDisplay,
          displayAsDots: displayAsDots,
        })
      );
    });

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

// TODO: use Set here when time is right, apparently it's not widely supported yet
function extractPageValues(outerWindow, currentPage, pageStartAtValue, pageEndAtValue) {
  let pageValues = [];
  pageValues.push(pageStartAtValue);
  pageValues.push(pageEndAtValue);

  let addPageValue = function(page) {
    pageValues.push(page);
  };

  if (outerWindow > 0) {
    let leftOuterWindowStartAtValue = pageStartAtValue + 1;
    let leftOuterWindowEndAtValue = pageStartAtValue + outerWindow;

    let rightOuterWindowStartAtValue = pageEndAtValue - 1 - outerWindow;
    let rightOuterWindowEndAtValue = pageEndAtValue - 1;

    createRange(leftOuterWindowStartAtValue, leftOuterWindowEndAtValue).forEach(addPageValue);
    createRange(rightOuterWindowStartAtValue, rightOuterWindowEndAtValue).forEach(addPageValue);
  }

  // add / subtract 2 for the dots display for the inner window
  // to handle exactly this use case (if 100 is current page): ... 99 100 101 ...
  let innerWindowStartAtValue = currentPage - 2;
  let innerWindowEndAtValue = currentPage + 2;
  createRange(innerWindowStartAtValue, innerWindowEndAtValue).forEach(addPageValue);

  let takeUnique = function(page, idx, array) {
    return array.indexOf(page) === idx;
  };

  return [...pageValues]
           .sort((a, b) => a - b)
           .filter((page) => page >= pageStartAtValue && page <= pageEndAtValue)
           .filter(takeUnique);

}

function shouldConsiderOuterWindowSettings(totalPages, outerWindow) {
  let firstPageContribution = 1;
  let lastPageContribution = 1;
  let extraCurrentPageContribution = 1;

  return totalPages > outerWindow * 2 + firstPageContribution + lastPageContribution + extraCurrentPageContribution;
}

function isAdjacentToCurrentPage(currentPage, page) {
  return (page === currentPage - 1) || (page === currentPage  + 1);
}

function isWithinOuterWindowLimit(outerWindow, totalPages, page) {
  return isWithinOuterWindowLimitFromLeft(outerWindow, page) ||
         isWithinOuterWindowLimitFromRight(outerWindow, totalPages, page);
}

function isWithinOuterWindowLimitFromLeft(outerWindow, page) {
  return page <= (outerWindow + 1);
}

function isWithinOuterWindowLimitFromRight(outerWindow, totalPages, page) {
  return (totalPages - page) <= outerWindow;
}

function createRange(start, end) {
  let range = [];
  for (let i = start; i <= end; i++) {
    range.push(i);
  }
  return range;
}
