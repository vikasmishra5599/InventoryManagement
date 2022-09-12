import {GET_ALL_AUTH_USERS, SAVE_REG_UPDATE_USER_RESPONSE, SAVE_USERS} from "../actionTypes";

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
            };

        case GET_ALL_AUTH_USERS:
        return{
            ...state,
            initialLoad: true
        };

        case SAVE_REG_UPDATE_USER_RESPONSE:
            const newUserList = state.users.slice();
            const filteredUser = newUserList.filter(user => user.id !== action.user.id );
            filteredUser.push(action.user);
            return {
                ...state,
                users: filteredUser
            };

        default:
            return state;
}

}
