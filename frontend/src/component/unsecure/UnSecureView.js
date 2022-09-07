import LoginContainer from "./Login/LoginContainer";
import {Route, Switch} from "react-router-dom";
import ForgotPasswordContainer from "./ForgotPassword/ForgotPasswordContainer";
import ResetPasswordContainer from "./ResetPassword/ResetPasswordContainer";


function UnSecureView(props) {

    return (<div id="unsecureView" style={{backgroundImage:"linear-gradient(120deg, rgb(8 28 71 / 50%), #1f3096)"}}>
            <Switch>
                <Route exact path={"/"} component={LoginContainer}/>
                <Route exact path={"/forgotpassword"} component={ForgotPasswordContainer}/>
                <Route exact path={"/resetPassword"} component={ResetPasswordContainer}/>
            </Switch>
        </div>)
}

export default UnSecureView;
