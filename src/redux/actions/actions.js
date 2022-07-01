import { ActionTypes } from "../action-creator/action-types"

export const setUsers = (users) => {
    return {
        type: ActionTypes.SET_USERS,
        payload: users
    }
}

export const setUser = (user) => {
    return {
        type: ActionTypes.SET_USER,
        payload: user
    }
}

export const setRequestedCars = (requestedCars) => {
    return {
        type: ActionTypes.CARS_REQUESTED_LIST,
        payload: requestedCars
    }
}

export const allVehicles = (vehicles) => {
    return {
        type: ActionTypes.ALL_OWNERS_VEHICLES,
        payload: vehicles
    }
}