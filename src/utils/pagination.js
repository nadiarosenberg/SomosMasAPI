const getPaginationInfo = (body) => {
  const paginationInfo = {
    page: parseInt(body.page) || 1,
    limit: parseInt(body.pageSize) || 10,
    order: body.order || 'DESC'
  }
  return paginationInfo;
};

const getOffSet = (paginationInfo) => {
  const offset = paginationInfo.page * paginationInfo.limit - paginationInfo.limit
  return offset;
};

const getNextPage = (paginationInfo, route, count) => {
  let rest = count - paginationInfo.page * paginationInfo.limit
  if(rest >0){
    let nextPage = route+(paginationInfo.page+1);
    return nextPage;
  }else{
    return null;
  }
};

const getPreviousPage = (page, route) => {
  if(page <= 1){
    return null;
  }
  return route+(page-1);
};

const getPaginationParams = (paginationInfo, propertyToSort) => {
  return paginationInfo?{
    limit: paginationInfo.limit,
    offset: getOffSet(paginationInfo),
    order: [[propertyToSort, paginationInfo.order]]
  }:{}
};

const getPaginationResult = (paginationInfo, route, results) => {
  results.prev = getPreviousPage(paginationInfo.page, route),
  results.current = paginationInfo.page,
  results.next = getNextPage(paginationInfo, route, results.count)
  return results; 
};

module.exports = {
  getPaginationParams,
  getPaginationResult,
  getPaginationInfo
};