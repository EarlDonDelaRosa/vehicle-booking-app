import { ActionTypes } from "../action-creator/action-types";

const initialState = {
    users: [],
}

export const userReducers = (state = initialState, {type, payload}) => {
    switch (type) {
        case ActionTypes.SET_USERS:
            return { ...state, users: payload };
        case ActionTypes.SET_USER:
            return { ...state, users: payload };
        default:
            return state;
    }
}

export const loggedUser = (state = {}, { type, payload }) => {
    // console.log(type);
    switch (type) {
      case ActionTypes.SET_USER:
        return { ...state, ...payload };
      default:
        return state;
    }
};