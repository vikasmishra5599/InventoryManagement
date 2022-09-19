import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import {Window} from "@mui/icons-material";
import Dashboard from "../../component/Dashboard";
import DashboardContainer from "../../component/secure/Dashboard/DashboardContainer";
import * as React from "react";
import ProductRegistration from "../../component/ProductRegistration";
import Users from "../../component/secure/Users/Users";

export const sideNavigation =[
    {
        name: 'Dashboard',
        path: '/',
        icon: <Window/>,
        component: <DashboardContainer/> ,
        hasAnyRole:["ROLE_USER", "ROLE_MANAGER", "ROLE_ADMIN"],
    },
    {
        name:'Users',
        path:'/users',
        icon: <PersonIcon/>,
        component: <Users/>,
        hasAnyRole:["ROLE_MANAGER", "ROLE_ADMIN"],
    },
    {
        name:'Product Registration',
        path:'/product',
        icon: <LockIcon/>,
        component: <ProductRegistration/>,
        hasAnyRole:["ROLE_MANAGER", "ROLE_ADMIN"],
    },
];

