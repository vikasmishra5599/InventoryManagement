import {GET_ALL_AUTH_USERS, SAVE_USERS} from "../actionTypes";

const initialValue = {
    users: [],
    initialLoad:false,
}

export default function Users(state=initialValue, action) {
    switch (action.type){
        case SAVE_USERS:
            const newUsers = action.payload;
            return{
                users: newUsers,
                initialLoad: true
            }
        case GET_ALL_AUTH_USERS:
            return{
                users: state.users.slice(),
                initialLoad: true,
            }
        default:
            return state;
}

}
