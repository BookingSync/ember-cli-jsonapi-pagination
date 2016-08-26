import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('paginate-collection', 'Integration | Component | paginate collection', {
  integration: true
});

test('it renders pagination links considering the outer window which is 3 by default', function(assert) {
  let paginationLinksContent;

  this.render(hbs`
    {{paginate-collection totalPages=5 currentPage=1}}
  `);

  paginationLinksContent = extractPaginationLinksContent(this);
  assert.deepEqual(paginationLinksContent, ["«", "1", "2", "3", "4", "5", "»"]);

  this.render(hbs`
    {{paginate-collection totalPages=15 currentPage=1}}
  `);

  paginationLinksContent = extractPaginationLinksContent(this);
  assert.deepEqual(paginationLinksContent, ["«", "1", "2", "3", "4", "...", "12", "13", "14", "15", "»"]);

  this.render(hbs`
    {{paginate-collection totalPages=15 currentPage=7}}
  `);

  paginationLinksContent = extractPaginationLinksContent(this);
  assert.deepEqual(paginationLinksContent, ["«", "1", "2", "3", "4", "...", "6", "7", "8", "...",  "12", "13", "14", "15", "»"]);

  this.render(hbs`
    {{paginate-collection totalPages=15 currentPage=4}}
  `);

  paginationLinksContent = extractPaginationLinksContent(this);
  assert.deepEqual(paginationLinksContent, ["«", "1", "2", "3", "4", "5", "...",  "12", "13", "14", "15", "»"]);

  this.render(hbs`
    {{paginate-collection totalPages=15 currentPage=5}}
  `);

  paginationLinksContent = extractPaginationLinksContent(this);
  assert.deepEqual(paginationLinksContent, ["«", "1", "2", "3", "4", "5", "6", "...",  "12", "13", "14", "15", "»"]);

  this.render(hbs`
    {{paginate-collection totalPages=15 currentPage=11}}
  `);

  paginationLinksContent = extractPaginationLinksContent(this);
  assert.deepEqual(paginationLinksContent, ["«", "1", "2", "3", "4", "...", "10", "11", "12", "13", "14", "15", "»"]);

  this.render(hbs`
    {{paginate-collection totalPages=15 currentPage=12}}
  `);

  paginationLinksContent = extractPaginationLinksContent(this);
  assert.deepEqual(paginationLinksContent, ["«", "1", "2", "3", "4", "...", "11", "12", "13", "14", "15", "»"]);

  this.render(hbs`
    {{paginate-collection totalPages=15 currentPage=7 outerWindow=2}}
  `);

  paginationLinksContent = extractPaginationLinksContent(this);
  assert.deepEqual(paginationLinksContent, ["«", "1", "2", "3", "...", "6", "7", "8", "...", "13", "14", "15", "»"]);

  this.render(hbs`
    {{paginate-collection totalPages=15 currentPage=3 outerWindow=2}}
  `);

  paginationLinksContent = extractPaginationLinksContent(this);
  assert.deepEqual(paginationLinksContent, ["«", "1", "2", "3", "4", "...", "13", "14", "15", "»"]);
});

test('it sets active class for current page and disables the link', function(assert) {
  this.render(hbs`
    {{paginate-collection totalPages=15 currentPage=3}}
  `);

  assert.equal(this.$().find('.active').length, 1);
  assert.equal(this.$().find('.active').find('a').attr('class'), 'disabled');
  assert.equal(this.$().find('.active').find('a').html(), '3');
});

test('it disables previous page link for first page', function(assert) {
  this.render(hbs`
    {{paginate-collection totalPages=15 currentPage=1}}
  `);

  assert.equal($(this.$().find('li')[0]).attr('class'), 'arrow prev disabled');
  assert.equal($(this.$().find('li')[10]).attr('class'), 'arrow next enabled-arrow');
});

test('it disables next page link for last page', function(assert) {
  this.render(hbs`
    {{paginate-collection totalPages=15 currentPage=15}}
  `);

  assert.equal($(this.$().find('li')[0]).attr('class'), 'arrow prev enabled-arrow');
  assert.equal($(this.$().find('li')[10]).attr('class'), 'arrow next disabled');
});

test('for not last, not first page, the links for previous and next pages are enabled', function(assert) {
  this.render(hbs`
    {{paginate-collection totalPages=15 currentPage=2}}
  `);

  assert.equal($(this.$().find('li')[0]).attr('class'), 'arrow prev enabled-arrow');
  assert.equal($(this.$().find('li')[10]).attr('class'), 'arrow next enabled-arrow');
});

test('it does not display paginator if totalPages is not more than 1', function(assert) {
  this.render(hbs`
    {{paginate-collection totalPages=1 currentPage=1}}
  `);

  assert.equal(this.$().text().trim(), '');
});

function extractPaginationLinksContent(context) {
  return Array.prototype.slice.call(context.$().find('a').map(function(i, el) {
    return $(el).html();
  }));
}
