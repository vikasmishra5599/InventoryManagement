import ResetPasswordCard from "./ResetPasswordCard";
import {connect} from "react-redux";
import {saveResetPassword} from "../../../redux/action";

const mapStateToProps=(store) =>{

}

const mapDispatchToProps={
  saveResetPassword
}

export default connect(mapStateToProps,mapDispatchToProps)(ResetPasswordCard);
