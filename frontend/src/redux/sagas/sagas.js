import { all } from '@redux-saga/core/effects';
import {loginRequestWatcher, logoffRequestWatcher, saveResetPasswordWatcher} from "./LoginSaga";
import {forgotPasswordRequestWatcher} from "./ResetPasswordSaga";
import {bootStrapRequestWatcher} from "./BootStrapSaga";
import {getAllAuthUserWatcher, registerUserWatcher, updateUserWatcher} from "./UsersSaga";


export default function* rootSaga() {
    yield all([
        loginRequestWatcher(),
        logoffRequestWatcher(),
        saveResetPasswordWatcher(),
        forgotPasswordRequestWatcher(),
        bootStrapRequestWatcher(),
        registerUserWatcher(),
        getAllAuthUserWatcher(),
        updateUserWatcher(),
    ]);
}
