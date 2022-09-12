import {login} from "../../../redux/action";
import LoginCard from "./LoginCard";
import {connect} from "react-redux";


const mapDispatchToProps={
login : login,
}

export default connect(null,mapDispatchToProps, null)(LoginCard)
