import {TOGGLE_SIDENAV} from "../actionTypes";

const defaultState ={
    sideNavOpen:false,
}

export default function SideNavigation(state= defaultState,action){
    switch (action.type){
        case TOGGLE_SIDENAV:
            const newSideNavOpen = !state.sideNavOpen;
            return{
                ...state,
                sideNavOpen: newSideNavOpen,
            }
        default:
            return state;
    }
}
