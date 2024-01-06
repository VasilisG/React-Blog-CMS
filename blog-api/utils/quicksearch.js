exports.getSearchResults = async(model, fields, queryStr, selectFields) => {
  const filters = fields.map(field => ({[field]: new RegExp(queryStr, 'i')}));
  const results = await model.find({
    $or: filters
  }).select(selectFields);
  return results;
}