import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {sideNavDrawerToggle} from "../../../redux/action";
import {connect} from "react-redux";
import UserAvatar from "./UserAvatar/UserAvatar";
import {styled} from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";

const drawerWidth = 240;

const AppBarComp = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

function AppBar(props) {

    const{
        sideNavDrawerToggle,
    }=props

    const handleDrawer=()=>{
        sideNavDrawerToggle();
    }

    return(
        <AppBarComp position="fixed">
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawer}
                    edge="start"
                    sx={{
                        marginRight: 5,
                    }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    InventT
                </Typography>
                <UserAvatar/>
            </Toolbar>
        </AppBarComp>
    );
}



const mapDispatchToProps={
    sideNavDrawerToggle
}

export default connect(null,mapDispatchToProps)(AppBar);
