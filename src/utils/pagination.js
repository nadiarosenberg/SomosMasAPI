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
        limit: paginationInfo.limit,
        offset: getOffSet(paginationInfo)
    }
    return paginationParams;
};

const getPaginationData = (paginationInfo, route, count) => {
    const paginationData = { 
        previousPage: route+getPreviousPage(paginationInfo.page),
        currentPage: paginationInfo.page,
        nextPage: route+getNextPage(paginationInfo, count)
    };
    return paginationData; 
};

module.exports = {
    getPaginationParams,
    getPaginationData,
    getPreviousPage,
    getNextPage
};