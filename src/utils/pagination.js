const getPaginationInfo = (body) => {
  const page = body.page;
  const limit = body.pageSize;
  const order = body.order;

  const isValidOrder = (data) =>{
    const order = data.toUpperCase();
    if (order === 'ASC' || order === 'DESC'){
      return true
    }else{
      return false
    }
  }

  const isValidNum = (data) => {
    const regex = /^[0-9]*$/;
    if (data.match(regex) != null){
      return true
    }else{
      return false
    }
  }

  if (isValidNum(page) && isValidNum(limit) && isValidOrder(order)){
    const paginationInfo = {
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 10,
        order: order || 'ASC'
    }
    return paginationInfo;
  }else{
    return console.log('Error')
  }
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

const getPaginationParams = (paginationInfo) => {
  const paginationParams = {
    limit: paginationInfo.limit || null,
    offset: getOffSet(paginationInfo) || null,
    order: paginationInfo.order || 'ASC'
  }
  return paginationParams;
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