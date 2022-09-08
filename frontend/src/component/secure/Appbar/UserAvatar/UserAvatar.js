import * as React from "react";
import {Avatar, Menu, MenuItem, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {connect} from "react-redux";
import {bootStrapApp, logoff} from "../../../../redux/action";
import {useEffect} from "react";
import {getToken} from "../../../../Utils/TokenUtils";
import {isEmpty} from "lodash";


function UserAvatar(props) {
    const {
        profile,
        initialLoad,
        tenant,
        bootStrapApp
    } = props;

    const [anchorEl, setAnchorEl] = React.useState(null);

    const headerTenant = tenant ? `${tenant}` : ``;

    useEffect(() => {
        if (!initialLoad && !isEmpty(getToken()) ) {
            bootStrapApp();
        }
    }, [initialLoad, bootStrapApp])

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleLogoff = () => {
        setAnchorEl(null);
        props.logoff();
    };

    const handleClose = () => {
        setAnchorEl(null);
    }

    function stringToColor(string) {
        let hash = 0;
        let i;
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }
        let color = '#';
        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        return color;
    }

    function stringAvatar(name) {
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`.toUpperCase(),
        };
    }

    return (
        <div>
            {headerTenant}
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
            >
                {profile.firstName+profile.email  ? <Avatar {...stringAvatar( profile.firstname + ' ' + profile.lastName)} />:<Avatar />}
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                keepMounted
                transformOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem>{profile.email}</MenuItem>
                <MenuItem onClick={handleLogoff}>Logoff</MenuItem>
            </Menu>
        </div>
    )
}

const mapStateToProps = (store) => ({
    profile: store.UserProfile.profile,
    initialLoad: store.UserProfile.initialLoad,
});

const mapDispatchToProps = {
    logoff,
    bootStrapApp
}

export default connect(mapStateToProps, mapDispatchToProps)(UserAvatar);
