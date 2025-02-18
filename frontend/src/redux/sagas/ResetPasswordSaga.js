import {call, put, takeLatest} from "@redux-saga/core/effects";
import * as actionTypes from "../actionTypes";
import * as LoginRequest from "../../Utils/DAO/LoginRequest";
import {isEmpty} from "lodash";
import {enqueueSnackbar} from "../action";
import {enqueueAPPSnackbar} from "../../Utils/SnackbarUtils";

export const forgotPasswordRequestWatcher=function*(){
    yield takeLatest(actionTypes.RESET_PASSWORD, forgotPasswordRequest);
};

function* forgotPasswordRequest(action){
    try {
        const response = yield call(LoginRequest.forgotPassword, action.payload);
        if (!isEmpty(response.data)) {
            yield put(enqueueSnackbar(enqueueAPPSnackbar(response.data.message + '', 'success')));
        }
    } catch (error) {
        yield put(enqueueSnackbar(enqueueAPPSnackbar(`Reset password Error ${error?.response?.data?.message}` , 'error')));
    }

}
