import {SAVE_TEAMS} from "../actionTypes";

const defaultState={
    teams: [
        {id: 1,
         name: 'Pure Access',
        description: 'Isonas Team'},
        {id: 2,
            name: 'CISA',
            description: 'CISA Europe'},
        {id: 3,
            name: 'ANZ',
            description: 'ANZ Team'}
    ],
    initialLoad:false,
}

export default function Teams(state=defaultState,action){

    switch ( action.type){
        case SAVE_TEAMS:
            const newTeams = action.payload;
            return {
                ...state,
                initialLoad: true,
                teams: newTeams};

        default:
            return state;
    }
}
