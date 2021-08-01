import userActionsTypes from "./user.types";

export const setCurrentUser = (user) => {
  return {
    type: userActionsTypes.SET_CURRENT_USER,
    payload: user,
  };
};
