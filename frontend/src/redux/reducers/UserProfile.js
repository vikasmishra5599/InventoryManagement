import {SAVE_PROFILE} from "../actionTypes";

const defaultState={
    profile: {
    },
    initialLoad:false,
}

export default function UserProfile(state=defaultState,action){

    switch ( action.type){
        case SAVE_PROFILE:
            const newProfile = action.profile;
            return {
                ...state,
                initialLoad: true,
                profile: newProfile};

        default:
            return state;
    }
}
