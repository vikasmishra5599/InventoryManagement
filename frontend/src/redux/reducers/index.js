import {combineReducers} from "redux";
import SnackbarNotifications from "./SnackbarNotifications";
import SideNavigation from "./SideNavigation";
import UserProfile from "./UserProfile";
import Teams from "./Teams";
import Users from "./Users";


export const createRootReducer = () =>
    combineReducers({
        SnackbarNotifications,
        SideNavigation,
        UserProfile,
        Teams,
        Users
    });
