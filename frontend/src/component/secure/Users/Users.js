import UsersTableContainer from "./UsersTable/UsersTableContainer";
import UsersSpeedDial from "./UsersSpeedDial/UsersSpeedDial";
import UserAddEditFormContainer from "./UserAddEditForm/UserAddEditFormContainer";
import {getAllAuthUser} from "../../../redux/action";
import {useEffect} from "react";
import {connect} from "react-redux";

function Users(props) {

    const {
        userInitialLoad,
        getAllAuthUser,
    }=props;

    useEffect(()=>{
        if(!userInitialLoad){
        getAllAuthUser();
    }
    },[userInitialLoad,getAllAuthUser()])

    return (
        <>
            <UsersSpeedDial/>
            <UsersTableContainer/>
            <UserAddEditFormContainer/>
        </>
    )
}

const mapStateToProps=(store)=>({
    userInitialLoad: store.Users.initialLoad
})

const mapDispatchToProps={
    getAllAuthUser
}

export default  connect(mapStateToProps, mapDispatchToProps)(Users);
