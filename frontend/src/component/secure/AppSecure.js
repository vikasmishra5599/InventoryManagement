import React, {useEffect} from "react";
import SideNavigation from "./SideNavigation/SideNavigation";
import {connect} from "react-redux";
import {getToken} from "../../Utils/TokenUtils";
import {bootStrapApp} from "../../redux/action";
import * as _ from "lodash";


function AppSecure(props){

    const{
        bootStrapApp
    }=props;

    useEffect(()=>{
      if(!_.isEmpty(getToken())){
          bootStrapApp();
    }
    },[getToken(),bootStrapApp])


    return(
        <div style={{marginTop :"70px"}} className="InventoryManagementApp">
            <SideNavigation/>
        </div>
    );
};

const mapStateToProps=(store)=>({


});

const mapDispatchToProps={
    bootStrapApp
};

export default connect(mapStateToProps, mapDispatchToProps) (AppSecure);
