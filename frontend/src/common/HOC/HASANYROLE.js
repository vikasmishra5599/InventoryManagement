import {connect} from "react-redux";
import * as React from "react";

function HASANYROLE(props){
    const{
        hasAnyRole,
        roles
    }=props;

    const hasRole = (role) => hasAnyRole?.includes(role);
    return(
        <>
            {roles?.some(hasRole) ? props.children : []}
        </>
    )
}

const mapStateToProps=(store)=>({
    roles: store.UserProfile.profile.roles,
})

export default connect(mapStateToProps,null)(HASANYROLE);


