/* global server */

import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | pagination');

test('pagination link work', function(assert) {
  server.createList('rental', 100);
  assert.expect(12);

  visit('/rentals');

  andThen(() => {
    let $rentalsList = find('.rentals-list li');
    let rentalNames = extractRentalNames($rentalsList);

    assert.equal($rentalsList.length, 5);
    assert.equal(find('li.active').text().trim(), '1');
    assert.deepEqual(rentalNames, ['Rental 1', 'Rental 2', 'Rental 3', 'Rental 4', 'Rental 5']);

    $(find('.page-number a')[2]).click();
  });

  andThen(() => {
    let $rentalsList = find('.rentals-list li');
    let rentalNames = extractRentalNames($rentalsList);

    assert.equal($rentalsList.length, 5);
    assert.equal(find('li.active').text().trim(), '3');
    assert.deepEqual(rentalNames, ['Rental 11', 'Rental 12', 'Rental 13', 'Rental 14', 'Rental 15']);

    find('li.next a').click();
  });

  andThen(() => {
    let $rentalsList = find('.rentals-list li');
    let rentalNames = extractRentalNames($rentalsList);

    assert.equal($rentalsList.length, 5);
    assert.equal(find('li.active').text().trim(), '4');
    assert.deepEqual(rentalNames, ['Rental 16', 'Rental 17', 'Rental 18', 'Rental 19', 'Rental 20']);

    find('li.prev a').click();
  });

  andThen(() => {
    let $rentalsList = find('.rentals-list li');
    let rentalNames = extractRentalNames($rentalsList);

    assert.equal($rentalsList.length, 5);
    assert.equal(find('li.active').text().trim(), '3');
    assert.deepEqual(rentalNames, ['Rental 11', 'Rental 12', 'Rental 13', 'Rental 14', 'Rental 15']);
  });
});


function extractRentalNames($listElements) {
  return Array.prototype.map.call($listElements, (el) => {
    return $(el).text();
  });
}
