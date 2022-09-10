import {call, put, takeLatest} from "@redux-saga/core/effects";
import * as actionTypes from "../actionTypes";
import {isEmpty} from "lodash";
import {enqueueSnackbar, saveResponseUsers} from "../action";
import {enqueueAPPSnackbar} from "../../Utils/SnackbarUtils";
import {getAllAuthUsersRest, saveRegisterUserRest} from "../../Utils/DAO/UsersRequest";


export const registerUserWatcher=function*(){
    yield takeLatest(actionTypes.SAVE_REGISTER_USER, registerUser);
};

function* registerUser(action){
    const { user } = action;
    try{
        const response = yield call(saveRegisterUserRest, user);
        if (!isEmpty(response.data )){
            yield put (enqueueSnackbar (enqueueAPPSnackbar('User Saved Successfully', 'success')));
        }
    } catch (error) {
        yield put (enqueueSnackbar (enqueueAPPSnackbar('Register User Error -' + error?.response?.data?.message ? error?.response?.data?.message: '!', 'error')));
    }
};

export const getAllAuthUserWatcher=function*(){
    yield takeLatest(actionTypes.GET_ALL_AUTH_USERS, getAllAuthUsers);
};

function* getAllAuthUsers() {
    try{
        const response = yield call(getAllAuthUsersRest);
        if (!isEmpty(response.data )){
            yield put (saveResponseUsers(response.data));
        }
    } catch (error) {
        yield put (enqueueSnackbar (enqueueAPPSnackbar('Get All Users Error' + error?.response?.data?.message ? error?.response?.data?.message: '!', 'error')));
    }
}
