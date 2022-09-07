import React, {useEffect, useState} from 'react';
import UnSecureView from "./component/unsecure/UnSecureView";
import AppSecure from "./component/secure/AppSecure";
import {connect} from "react-redux";
import useNotifier from "./UseNotifier";
import {getToken} from "./Utils/TokenUtils";

function ImsApp(props) {

    const [secure, setSecure]=useState(false);

    useEffect(()=>{
        if (getToken().length>0) {
            setSecure(true);
        }else{
            setSecure(false);
        }
    },[getToken(),setSecure])

    useNotifier();
    return (
        <div>
            {secure ? <AppSecure/>: <UnSecureView/>}
        </div>
    );
}

const mapStateToProps=(store)=>({
    initialLoad : store.UserProfile.initialLoad
})

export default connect(mapStateToProps,null) (ImsApp);
