const initialState = {
    isPending: false,
    isRejected: false,
    isFulfilled: false,
    UserLogin: []
  }
  
  const loginUser = (prevState = initialState, action) => {
    switch (action.type) {
      case "LOGIN_PENDING":
        return {
          ...prevState,
          isPending: true,
          isRejected: false,
          isFulfilled: false
        };
      case "LOGIN_REJECTED":
        return {
          ...prevState,
          isPending: false,
          isRejected: true,
          UserLogin: action.payload.data
        };
      case "LOGIN_FULFILLED":
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
  
  export default loginUser;