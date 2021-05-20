const getPaginationInfo = (body) => {
  const paginationInfo = {
    page: parseInt(body.page) || 1,
    limit: parseInt(body.pageSize) || 10,
    order: body.order || 'ASC'
  }
  return paginationInfo;
};

const getOffSet = (paginationInfo) => {
    const offset = paginationInfo.page * paginationInfo.limit - paginationInfo.limit
    return offset;
};

const getNextPage = (paginationInfo, count) => {
  let rest = count - paginationInfo.page * paginationInfo.limit
  if(rest >0){
    let page = paginationInfo.page;
    return page+1;
  }else{
    return null;
  }
};

const getPreviousPage = (page) => {
  if (page <= 1) {
    return null;
  }
  return page-1;
};

const getPaginationParams = (paginationInfo) => {
    const paginationParams = {
        limit: paginationInfo.limit || null,
        offset: getOffSet(paginationInfo) || null,
        order: paginationInfo.order || 'ASC'
    }
    return paginationParams;
};

const getPaginationResult = (paginationInfo, route, results) => {
    results.prev = route+getPreviousPage(paginationInfo.page),
    results.current = paginationInfo.page,
    results.next = route+getNextPage(paginationInfo, results.count)
    return results; 
};

module.exports = {
    getPaginationParams,
    getPaginationResult,
    getPaginationInfo
};