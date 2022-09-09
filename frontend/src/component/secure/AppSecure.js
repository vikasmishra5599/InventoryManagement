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
        <div className="InventoryManagementApp">
            <h1> Inventory Management System</h1>
            <SideNavigation/>
            {/*<Switch>
                <RouteWithLayout exact path="/employee" component={EmployeeRegistration} />
                <RouteWithLayout exact path="/product" component={ProductRegistration} />
                <RouteWithLayout exact path="/audit" component={Audit} />
                <RouteWithLayout component={Dashboard} />
            </Switch>*/}
        </div>
    );
};

const mapStateToProps=(store)=>({


});

const mapDispatchToProps={
    bootStrapApp
};

export default connect(mapStateToProps, mapDispatchToProps) (AppSecure);
