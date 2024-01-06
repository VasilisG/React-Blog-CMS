export const createQueryParams = (currentPage, filters, limit, sortField, sortOrder) => {
  let result = '';
  let pageParam = createPageParam(currentPage);
  let filtersParam = createFiltersParam(filters);
  let limitParam = createLimitParam(limit);
  let sortParam = createSortParam(sortField, sortOrder);
  result = '?' + [filtersParam, sortParam, pageParam, limitParam].filter(param => param !== '').join('&');
  return result;
}

const hasPageParam = (currentPage) => {
  return currentPage > 0;
}

const hasFiltersParam = (filters) => {
  for(let filterKey of Object.keys(filters)){
    if(filters[filterKey].length){
      return true;
    }
  }
  return false;
}

const isValidSortParam = (field) => {
  return field !== null && field !== undefined && field !== '';
}

const createPageParam = (currentPage) => {
  return hasPageParam(currentPage) ? `p=${currentPage}` : 'p=1';
}

const createFiltersParam = (filters) => {
  if(hasFiltersParam(filters)){
    let filtersParam = Object.keys(filters)
    .filter(key => filters[key].length)
    .map(key => {
        return `${key}=${filters[key]}`;
    }).join('&');
    return filtersParam;
  }
  else return '';
}

const createLimitParam = (limit) => {
  return limit !== null && limit > 0 ? `limit=${limit}` : '';
}

const createSortParam = (sortField, sortOrder) => {
  const sortFieldParam = isValidSortParam(sortField) ? `sort=${sortField}` : '';
  const sortOrderParam = isValidSortParam(sortOrder) ? `&order=${sortOrder}` : '';
  if(sortFieldParam.length && sortOrderParam.length) {
    return `${sortFieldParam}${sortOrderParam}`;
  }
  return '';
}