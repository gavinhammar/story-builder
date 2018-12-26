const initialState = {
    name: "",
    username: "",
    password: ""
  };

  const rootReducer = (state = initialState, action)  => 
  {
    switch (action.type) {
        case "ADD_NAME":
            state.name = action.payload;
            return state;
        case "LOGIN_USER":
            state.username = action.payload.username;
            state.password = action.payload.profile.api_key;
            state.profile = action.payload.profile;
            return state;
        case "LOGOUT_USER":
            state.username = null;
            state.password = null;
            state.profile = null;
            return state;
      default:
        return state;
    }
  }

  export default rootReducer;
