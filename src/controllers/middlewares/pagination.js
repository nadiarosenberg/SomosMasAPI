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