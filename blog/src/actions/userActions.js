import { USER_ACTIONS } from "./constants"

const login = (user) => {
  return {
    type: USER_ACTIONS.LOGIN,
    payload: user
  }
}

const logout = (user) => {
  return {
    type: USER_ACTIONS.LOGOUT,
    payload: user
  }
}

const userExports = {
  login,
  logout
};

export default userExports;