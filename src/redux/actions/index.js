export const addName = name => ({ type: "ADD_NAME", payload: name });
export const loginUser = credentials => ({ type: "LOGIN_USER", payload: credentials });
export const logoutUser = credentials => ({ type: "LOGOUT_USER", payload: {} });