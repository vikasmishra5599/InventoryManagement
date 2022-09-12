import {call, put, takeLatest} from "@redux-saga/core/effects";
import {enqueueSnackbar, saveProfile} from "../action";
import * as actionTypes from "../actionTypes";
import * as LoginRequest from "../../Utils/DAO/LoginRequest";
import {deleteToken, saveToken} from "../../Utils/TokenUtils";
import {isEmpty} from "lodash";
import {enqueueAPPSnackbar} from "../../Utils/SnackbarUtils";
import {history} from "../../configureStore";

export const loginRequestWatcher=function*(){
    yield takeLatest(actionTypes.LOGIN, loginRequest);
};

function* loginRequest(action){
    const { username, password } = action;
    try{
        const response = yield call(LoginRequest.login, username, password);
        if (!isEmpty(response.data && response.data.jwt )){
            if (response.data.jwt){
                saveToken(response.data.jwt,response.data.expiration);
                yield put(saveProfile({user: response.data.username, roles: response.data.authorities}));
            }
        }
    } catch (error) {
        yield put (enqueueSnackbar (enqueueAPPSnackbar('Login Error !!', 'error')));
    }
};

export const logoffRequestWatcher=function*(){
    yield takeLatest(actionTypes.LOGOFF,logoffRequest);
};

function* logoffRequest(){
    deleteToken();
    yield put (enqueueSnackbar (enqueueAPPSnackbar('Logged off successfully !!', 'success')));
}

export const saveResetPasswordWatcher = function* () {
    yield takeLatest(actionTypes.SAVE_RESET_PASSWORD, saveResetPassword);
};

function* saveResetPassword(action) {
    try {
        const response = yield call(LoginRequest.saveResetPassword, action.payload);
        if (!isEmpty(response.data)) {
            yield put(enqueueSnackbar(enqueueAPPSnackbar(response.data.message, 'success')));
            yield put(history.push('/'));
        }
    } catch (error) {
        yield put(enqueueSnackbar(enqueueAPPSnackbar('Save Reset password Error -' + error?.response?.data?.message ? error?.response?.data?.message: '!', 'error')));
    }
}
