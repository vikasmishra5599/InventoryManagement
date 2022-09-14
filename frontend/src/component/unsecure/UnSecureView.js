import LoginContainer from "./Login/LoginContainer";
import {Route, Switch} from "react-router-dom";
import ForgotPasswordContainer from "./ForgotPassword/ForgotPasswordContainer";
import ResetPasswordContainer from "./ResetPassword/ResetPasswordContainer";
import backgroundImage from "../../Assets/Images/white-abstract-background.jpeg"

function UnSecureView(props) {

    return (<div id="unsecureView" style={{backgroundImage:"url(/ims" + backgroundImage + ")"}} >
            <Switch>
                <Route exact path="/forgotpassword">  <ForgotPasswordContainer/> </Route>
                <Route exact path="/resetPassword">  <ResetPasswordContainer/> </Route>
                <Route>  <LoginContainer/> </Route>
            </Switch>
        </div>)
}

export default UnSecureView;
