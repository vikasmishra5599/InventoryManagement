import {forgotPassword} from "../../../redux/action";
import {connect} from "react-redux";
import ForgotPasswordCard from "../ForgotPassword/ForgotPassword";


const mapDispatchToProps={
    forgotPassword : forgotPassword,
}

export default connect(null,mapDispatchToProps)(ForgotPasswordCard)
