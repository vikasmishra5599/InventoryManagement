import Products from "../../component/secure/Products/Products";
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import {Window} from "@mui/icons-material";
import Dashboard from "../../component/Dashboard";

export const sideNavigation =[

    {
        name: 'Dashboard',
        path: '/',
        icon: <Window/>,
        component: Dashboard,
    },

    {
        name:'Users',
        path:'/users',
        icon: <PersonIcon/>,
        component: Products,
    },
    {
        name:'Product Reg',
        path:'/product',
        icon: <LockIcon/>,
        component: Products,
    },

];

