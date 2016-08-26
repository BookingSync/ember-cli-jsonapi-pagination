export default function() {
  this.get('/rentals', (schema, request) => {
    let allRentals = schema.rentals.all();
    if (request.queryParams["page[number]"] && request.queryParams["page[size]"]) {
      let pageNumber = Number(request.queryParams["page[number]"]);
      let pageSize = Number(request.queryParams["page[size]"]);
      allRentals.totalPages = Math.ceil(allRentals.models.length / pageSize);

      let fromIndex = (pageNumber - 1) * pageSize;
      let rentalsForCurrentPage = allRentals.models.splice(fromIndex, pageSize);

      allRentals.models = rentalsForCurrentPage;
    }
    return allRentals;
  });
}
