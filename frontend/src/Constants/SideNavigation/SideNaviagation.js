import Products from "../../component/secure/Products/Products";
import PersonIcon from '@mui/icons-material/Person';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LockIcon from '@mui/icons-material/Lock';
import TeamsTable from "../../component/secure/Teams/TeamsTable/TeamsTable";

export const sideNavigation =[
    {
        name:'Products',
        path:'/home',
        icon: <LockIcon/>,
        component: Products,
    },
    {
        name:'Users',
        path:'/home',
        icon: <PersonIcon/>,
        component: Products,
    },
    {
        name:'Teams',
        path:'/teams',
        icon: <PeopleAltIcon/>,
        component: TeamsTable,
    }
];

