import {call, put, takeLatest} from "@redux-saga/core/effects";
import * as actionTypes from "../actionTypes";
import {isEmpty} from "lodash";
import {enqueueSnackbar, saveProfile} from "../action";
import {enqueueAPPSnackbar} from "../../Utils/SnackbarUtils";
import * as DataRequests from "../../Utils/DAO/DataRequests";


export const bootStrapRequestWatcher=function*(){
    yield takeLatest(actionTypes.BOOTSTRAP_APP, bootStrapApp);
};
//getAuthUserDetail
function* bootStrapApp(){
    try{
        const response = yield call(DataRequests.getAuthUserDetail);
        if (!isEmpty(response.data)){
            if (response?.data){
                yield put(saveProfile(response.data));
            }
        }
    } catch (error) {
        console.log(' error ', error );
        yield put (enqueueSnackbar (enqueueAPPSnackbar('Bootsrap Application failed', 'error')));
    }
}
