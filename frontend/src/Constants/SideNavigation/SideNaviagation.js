import Products from "../../component/secure/Products/Products";
import PersonIcon from '@mui/icons-material/Person';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LockIcon from '@mui/icons-material/Lock';
import TeamsTable from "../../component/secure/Teams/TeamsTable/TeamsTable";
import {Window} from "@mui/icons-material";
import Dashboard from "../../component/Dashboard";

export const sideNavigation =[
    {
        name:'Products',
        path:'/product',
        icon: <LockIcon/>,
        component: Products,
    },
    {
        name: 'Users',
        path: '/product',
        icon: <PersonIcon/>,
        component: Products,
    },
    {
        name: 'Teams',
        path: '/teams',
        icon: <PeopleAltIcon/>,
        component: TeamsTable,
    },
    {
        name: 'Dashboard',
        path: '/',
        icon: <Window/>,
        component: Dashboard,
    }
];

