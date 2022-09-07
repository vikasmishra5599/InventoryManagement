import {combineReducers} from "redux";
import {connectRouter} from "connected-react-router";
import SnackbarNotifications from "./SnackbarNotifications";
import SideNavigation from "./SideNavigation";
import UserProfile from "./UserProfile";
import Teams from "./Teams";
import Users from "./Users";


export const createRootReducer = (history) =>
    combineReducers({
        SnackbarNotifications,
        router : connectRouter(history),
        SideNavigation,
        UserProfile,
        Teams,
        Users
    });
