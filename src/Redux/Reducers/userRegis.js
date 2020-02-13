const initialState = {
    isPending: false,
    isRejected: false,
    isFulfilled: false,
    UserRegis: []
  }
  
  const regisUser = (prevState = initialState, action) => {
    switch (action.type) {
      case "REGIS_PENDING":
        return {
          ...prevState,
          isPending: true,
          isRejected: false,
          isFulfilled: false
        };
      case "REGIS_REJECTED":
        return {
          ...prevState,
          isPending: false,
          isRejected: true,
          UserLogin: action.payload.data
        };
      case "REGIS_FULFILLED":
        return {
          ...prevState,
          isPending: false,
          isFulfilled: true,
          UserLogin: action.payload.data
        };
      default:
        return prevState;
    }
  }
  
  export default regisUser;