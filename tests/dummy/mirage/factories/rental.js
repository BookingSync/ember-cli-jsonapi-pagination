import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  name(i) { return `Rental ${i + 1}`; },
});
