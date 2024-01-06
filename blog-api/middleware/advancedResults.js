const constants = require('../config/constants');

const filterData = (model, populate) => async (req, res, next) => {

  // Getting query params.
  const queryParams = { ... req.query };

  // Fields to exclude.
  const removeFields = ['sort', 'order', 'p', 'limit'];

  // Loop over removeFields and delete them from reqQuery.
  removeFields.forEach(param => delete queryParams[param]);

  // Initialize filters response data.
  const filters = { ... queryParams };

  // Filter based on ID.
  if(queryParams.id){
    queryParams.id = { '$regex': queryParams.id, '$options': 'i' };
  }

  // Filter based on title.
  if(queryParams.title){
    queryParams.title = { '$regex': queryParams.title, '$options': 'i' };
  }

  // Filter based on content.
  if(queryParams.content){
    queryParams.content = { '$regex': queryParams.content, '$options': 'i' };
  }

  // Filter tags based on their name.
  if(queryParams.name){
    queryParams.name = { '$regex': queryParams.name, '$options': 'i' };
  }

  // Filter based on parent.
  if(queryParams.parent){
    if(queryParams.parent == 'null'){
      queryParams.parent = null;
    }
  }

  // Filter based on date.
  if(queryParams.creation_from){
     if(queryParams.creation_to){
      queryParams.created_at = {
        '$gte': new Date(queryParams.creation_from), 
        '$lte': new Date(queryParams.creation_to)
      };
     }
     else {
      queryParams.created_at = {
        '$gte': new Date(queryParams.creation_from),
      };
     }
  }

  else if(queryParams.creation_to){
    queryParams.created_at = {
      '$lte': new Date(queryParams.creation_to),
    };
  }

  // Filter based on category.
  if(queryParams.categories){
    queryParams.categories = {'$in': queryParams.categories.split(',')};
  }

  // Filter based on tags.
  if(queryParams.tags){
    queryParams.tags = {'$in': queryParams.tags.split(',')};
  }

  // Remove creation_from and creation_to and use created_at instead.
  delete queryParams.creation_from;
  delete queryParams.creation_to;

  // Create mongoDB find() parameters.
  let queryStr = JSON.stringify(queryParams);

  // Getting data.
  let query = model.find(JSON.parse(queryStr));

  // Sort data.
  const sort = req.query.sort ? req.query.sort : '';
  const order = req.query.order ? req.query.order : '';
  if(sort && order) {
    query.sort({[sort]: [order]});
  }
  
  // Pagination variables.
  const page = parseInt(req.query.p) || constants.CURRENT_PAGE;
  const limit = parseInt(req.query.limit) || constants.LIMIT;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await model.count({ ... queryParams });
  const totalPages = Math.ceil(total / limit);

  query.skip(startIndex).limit(endIndex);

  // Populate with other documents.
  if(populate){
    for(doc of populate){
      query = query.populate(doc);
    }
  }

  // Executing query.
  const results = await query;

  // Pagination result.
  const pagination = {};

  pagination.totalPages = totalPages;
  pagination.page = page;
  pagination.limit = limit;

  if(endIndex < total) {
    pagination.next = {
      page: page + 1,
    };
  }

  else {
    pagination.next = {
      page: total,
    };
  }

  if(startIndex > total) {
    pagination.prev = {
      page: page - 1,
    };
  }

  else {
    pagination.prev = {
      page: 1,
    };
  }

  res.filteredResults = {
    success: true,
    count: results.length,
    pagination,
    data: results,
    total,
    filters,
    sort,
    order
  };

  next();
}

module.exports = {filterData};