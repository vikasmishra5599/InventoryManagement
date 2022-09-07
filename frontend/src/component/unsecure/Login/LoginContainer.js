import {connect} from "react-redux";
import {login} from "../../../redux/action";
import LoginCard from "./LoginCard";
import {push} from "connected-react-router";


const mapDispatchToProps={
login : login,
    push: push,
}

export default connect(null,mapDispatchToProps, null)(LoginCard)
