const getPaginationInfo = body => {
  const paginationInfo = {
    page: parseInt(body.page) || 1,
    limit: parseInt(body.pageSize) || 10,
    order: body.order || 'DESC',
  };
  return paginationInfo;
};

const getOffSet = paginationInfo => {
  const offset = paginationInfo.page * paginationInfo.limit - paginationInfo.limit;
  return offset;
};

const getNextPage = (paginationInfo, route, count) => {
  const {page, limit, order} = paginationInfo;
  let rest = count - page * limit;
  if (rest > 0) {
    let nextPage = `${route}?page=${page + 1}&pageSize=${limit}&order=${order}`;
    return nextPage;
  } else {
    return null;
  }
};

const getPreviousPage = (paginationInfo, route) => {
  const {page, limit, order} = paginationInfo;
  if (page <= 1) {
    return null;
  }
  return `${route}?page=${page - 1}&pageSize=${limit}&order=${order}`;
};

const getPaginationParams = (paginationInfo, propertyToSort) => {
  return paginationInfo
    ? {
        limit: paginationInfo.limit,
        offset: getOffSet(paginationInfo),
        order: [[propertyToSort, paginationInfo.order]],
      }
    : {};
};

const getPaginationResult = (paginationInfo, route, results) => {
  const {page, limit, order} = paginationInfo;
  results.current = `${route}?page=${page}&pageSize=${limit}&order=${order}`;
  results.prev = getPreviousPage(paginationInfo, route);
  results.next = getNextPage(paginationInfo, route, results.count);
  return results;
};

module.exports = {
  getPaginationParams,
  getPaginationResult,
  getPaginationInfo,
};
