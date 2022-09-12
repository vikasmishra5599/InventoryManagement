import { all } from '@redux-saga/core/effects';
import {loginRequestWatcher, logoffRequestWatcher, saveResetPasswordWatcher} from "./LoginSaga";
import {forgotPassworsRequestWatcher} from "./ResetPasswordSaga";
import {bootStrapRequestWatcher} from "./BootStrapSaga";
import {getAllAuthUserWatcher, registerUserWatcher, updateUserWatcher} from "./UsersSaga";


export default function* rootSaga() {
    yield all([
        loginRequestWatcher(),
        logoffRequestWatcher(),
        saveResetPasswordWatcher(),
        forgotPassworsRequestWatcher(),
        bootStrapRequestWatcher(),
        registerUserWatcher(),
        getAllAuthUserWatcher(),
        updateUserWatcher(),
    ]);
}
