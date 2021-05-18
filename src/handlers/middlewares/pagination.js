const getNextPage = (count, limit, page, url) => {
  let result = count - limit * page;
  if(result > 0){
    return `/${url}?page=${ +page + 1 }`;
  }
  return null;
}

const getPriorPage = (page, url) => {
  if(page == 1){
    return null;
  }
  return `/${url}?page=${ +page - 1 }`;
}

module.exports = {
  getNextPage,
  getPriorPage
}