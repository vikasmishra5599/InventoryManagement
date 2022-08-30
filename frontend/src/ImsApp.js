import React from 'react';
import {Switch} from "react-router-dom";

import EmployeeRegistration from "./component/EmployeeRegistration";
import ProductRegistration from "./component/ProductRegistration";
import Audit from "./component/Audit";
import Dashboard from "./component/Dashboard";
import RouteWithLayout from './common/RouteWithLayout';
import ProductAssignment from './component/ProductAssignment';

function ImsApp() {
  return (
    <div className="InventoryManagementApp">
        <h1> Inventory Management System</h1>
        <Switch>
          <RouteWithLayout exact path="/employee" component={EmployeeRegistration} />
          <RouteWithLayout exact path="/product" component={ProductRegistration} />
          <RouteWithLayout exact path="/audit" component={Audit} />
          <RouteWithLayout exact path="/assignment" component={ProductAssignment} />
          <RouteWithLayout component={Dashboard} />
        </Switch>
    </div>
  );
}

export default ImsApp;
