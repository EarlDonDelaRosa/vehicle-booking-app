import { ActionTypes } from "../action-creator/action-types";

const initialState = {
    cars: [],
}

export const carReducers = (state = initialState, {type, payload}) => {
    switch (type) {
        case ActionTypes.CARS_REQUESTED_LIST:
            return { ...state, cars: payload };
        case ActionTypes.ALL_OWNERS_VEHICLES:
            return { ...state, cars: payload };
        default:
            return state;
    }
}


