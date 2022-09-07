import { all } from '@redux-saga/core/effects';
import {loginRequestWatcher, logoffRequestWatcher, saveResetPasswordWatcher} from "./LoginSaga";
import {forgotPassworsRequestWatcher} from "./ResetPasswordSaga";
import {bootStrapRequestWatcher} from "./BootStrapSaga";


export default function* rootSaga() {
    yield all([
        loginRequestWatcher(),
        logoffRequestWatcher(),
        saveResetPasswordWatcher(),
        forgotPassworsRequestWatcher(),
        bootStrapRequestWatcher(),
    ]);
}
