import React, {useEffect, useState} from 'react';
import UnSecureView from "./component/unsecure/UnSecureView";
import AppSecure from "./component/secure/AppSecure";
import {connect} from "react-redux";
import useNotifier from "./UseNotifier";
import {getToken} from "./Utils/TokenUtils";
import {useHistory} from "react-router-dom";

function ImsApp(props) {

    const [secure, setSecure]=useState(false);

    const history = useHistory();
    useEffect(()=>{
        if (getToken().length>0) {
            setSecure(true);
            history.push("/")
        }else{
            setSecure(false);
        }
    },[getToken(),setSecure,history])

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
