import UsersTable from "./UsersTable";
import {connect} from "react-redux";


const mapStateToProps=(store)=>({
    users:store.users.users,
})

export default connect(mapStateToProps,null)(UsersTable)
