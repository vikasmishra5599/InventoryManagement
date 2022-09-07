import {SAVE_USERS} from "../actionTypes";

const initialValue = {
    users: [{
        "id": 1, "email": "inventtadmin@allegion.com", "firstname": "admin", "lastName": "Lname", "isActive": true
    }, {
        "id": 2,
        "email": "sankarganesh22.subramaniam@allegion.com",
        "firstname": "Sankar ",
        "lastName": "Ganesh",
        "isActive": true
    }, {
        "id": 3, "email": "ww", "firstname": "Sankar ", "lastName": "Ganesh", "isActive": true
    }, {
        "id": 4,
        "email": "sankarganesh.subramaniam@allegion.com",
        "firstname": "Sankar ",
        "lastName": "Ganesh",
        "isActive": true
    }]
}

export default function Users(state=initialValue, action) {
    switch (action.type){
        case SAVE_USERS:
            const newUsers = action.payload;
            return{
                ...state,
                users: newUsers,
            }
        default:
            return state;
}

}
