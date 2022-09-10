import * as React from 'react';
import {useState} from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {sideNavDrawerToggle} from "../../../redux/action";
import {connect} from "react-redux";
import Button from "@mui/material/Button";
import {sideNavigation} from "../../../Constants/SideNavigation/SideNaviagation";
import AppBar from "../Appbar/Appbar";
import {Route, Switch, useHistory} from "react-router-dom";
import ProductRegistration from "../../ProductRegistration";
import Users from "../Users/Users";
import DashboardContainer from "../Dashboard/DashboardContainer";

const drawerWidth = 180;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));


const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

function SideNav(props) {

    const {
        isOpen,
        sideNavDrawerToggle,
    } = props;

    const history = useHistory();

    const [pathToggle, setPathToggle] = useState(false);

    const handleDrawer = () => {
        sideNavDrawerToggle();
    };

    function routerPush(path) {
        setPathToggle(!pathToggle);
        history.push(path);
    }

    return (
        <Box sx={{display: 'flex'}}>
            <AppBar/>
            <Drawer variant="permanent" open={isOpen}>
                <DrawerHeader/>
                <Divider/>
                <List>
                    {sideNavigation.map((menu, index) => (
                        <ListItem key={index} disablePadding sx={{display: 'block'}}
                                  onClick={() => routerPush(menu.path)}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: isOpen ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: isOpen ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {menu.icon}
                                </ListItemIcon>
                                <ListItemText primary={menu.name} sx={{opacity: isOpen ? 1 : 0}}/>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>

                <Button onClick={handleDrawer}>
                    {isOpen ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                </Button>
            </Drawer>
            <div>
                {/*<BreadCrumb/>*/}
                <Switch >
                    <Route exact path="/"> <DashboardContainer/> </Route>
                    <Route exact path="/product"> <ProductRegistration/> </Route>
                    <Route exact path="/users">  <Users/> </Route>

                </Switch>
            </div>
        </Box>
    );
}

const mapStateToProps = (store) => ({
    isOpen: store.SideNavigation.sideNavOpen,
});

const mapDispatchToProps = {
    sideNavDrawerToggle
}

export default connect(mapStateToProps, mapDispatchToProps)(SideNav);
