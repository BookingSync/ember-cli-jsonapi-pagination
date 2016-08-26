import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  serialize(object) {
    let json = ApplicationSerializer.prototype.serialize.apply(this, arguments);
    json.meta = {
      "total-pages": object.totalPages
    };
    return json;
  }
});

