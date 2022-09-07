import * as actionTypes from "./actionTypes";
import {RESET_PASSWORD, SAVE_PROFILE, SAVE_RESET_PASSWORD} from "./actionTypes";

export const addEmployee = () => ({
    type: actionTypes.ADD_EMPLOYEE,
    payload: {}
});

export const addProduct = () => ({
    type: actionTypes.ADD_PRODUCT,
    payload: {}
});

export const login =(username, password)=>({
    type : actionTypes.LOGIN,
    username : username,
    password: password
})

export const enqueueSnackbar = (notification) => {
    const key = notification.options && notification.options.key;
    return {
        type: actionTypes.ENQUEUE_SNACKBAR,
        notification: {
            ...notification,
            key: key || new Date().getTime() + Math.random(),
        },
    };
};

export const closeSnackbar = (key) => ({
    type: actionTypes.CLOSE_SNACKBAR,
    dismissAll: !key, // dismiss all if no key has been defined
    key,
});

export const removeSnackbar = key => ({
    type: actionTypes.REMOVE_SNACKBAR,
    key,
});

export const sideNavDrawerToggle = () => ({
    type: actionTypes.TOGGLE_SIDENAV,
});

export const bootStrapApp = ()=>({
    type : actionTypes.BOOTSTRAP_APP
})

export const logoff =()=>({
    type:actionTypes.LOGOFF
})

export const saveProfile =(payload)=>({
    type: actionTypes.SAVE_PROFILE,
    profile: payload
})

export const saveResetPassword = (payload)=>({
    type:actionTypes.SAVE_RESET_PASSWORD,
    payload: payload
})

export const forgotPassword = (payload) =>({
    type : actionTypes.RESET_PASSWORD,
    payload: payload,
})


