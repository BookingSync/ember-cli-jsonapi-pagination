# ember-cli-jsonapi-pagination

This addon adds support for pagination with JSONAPI backend.

Currently only a paged-based strategy is supported, more details about JSONAPI pagination: [http://jsonapi.org/format/#fetching-pagination](http://jsonapi.org/format/#fetching-pagination).

## Usage

To install the addon run:

```
ember install ember-cli-jsonapi-pagination
```

You need to include pagination mixins in your route and controller which are responsible for paginated resource:

```js
// app/routes/models/index.js

import Ember from 'ember';
import Pagination from 'ember-cli-jsonapi-pagination/mixins/routes/jsonapi-pagination';

export default Ember.Route.extend(Pagination);
```

```js
// app/controllers/models/index.js

import Ember from 'ember';
import Pagination from 'ember-cli-jsonapi-pagination/mixins/controllers/jsonapi-pagination';

export default Ember.Controller.extend(Pagination);
```

That way the query params (`size` - by default equal to 15 and `number` - by default equal to 1) and required actions (`setCurrentPage` for setting current page in query params and `setCurrentSize` for setting size in query params) are available in the controller / route. To to perform query with pagination params use `queryPaginated` function:

``` js
// app/routes/models/index.js
import Ember from 'ember';
import Pagination from 'ember-cli-jsonapi-pagination/mixins/routes/jsonapi-pagination';

export default Ember.Route.extend(Pagination, {
  model(params) {
    return this.queryPaginated('rental', params);
  }
});
```

You also need to define a property that will return the amount of all pages, this value will most likely come from the meta data in API response, here's one example:


``` js
// app/controllers/models/index.js

import Ember from 'ember';
import Pagination from 'ember-cli-jsonapi-pagination/mixins/controllers/jsonapi-pagination';

export default Ember.Controller.extend(Pagination, {
  totalPages: Ember.computed('size', 'number', 'model.[]', function() {
    return this.get('model.meta.total-pages');
  })
});
```

To render the paginator in your templates, use `paginate-collection` component:

``` hbs
app/templates/some-template.hbs

{{paginate-collection totalPages=totalPages currentPage=number setCurrentPage=(action "setCurrentPage")}}
```

`totalPages` should be total amount of pages (returned most likely in the meta data in API response), `number` query param comes from the controller and `setCurrentPage` also comes from controller.

That's all you need to do to handle pagination with JSONAPI!

Currently the HTML template for paginator is based on Bootstrap 3.


## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).
