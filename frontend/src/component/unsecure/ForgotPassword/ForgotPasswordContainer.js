import {forgotPassword} from "../../../redux/action";
import {connect} from "react-redux";
import ForgotPasswordCard from "../ForgotPassword/ForgotPassword";
import {push} from "connected-react-router";


const mapDispatchToProps={
    forgotPassword : forgotPassword,
    push : push,
}

export default connect(null,mapDispatchToProps)(ForgotPasswordCard)
