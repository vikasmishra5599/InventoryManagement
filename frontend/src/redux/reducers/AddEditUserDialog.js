import {SET_ADD_USER_DIALOG_OPEN} from "../actionTypes";


const initialState ={
    isOpen : false,
    user : {},
    isEdit:false
}

export default function AddEditUserDialog(state = initialState, action){

    switch (action.type)
    {
        case SET_ADD_USER_DIALOG_OPEN:
            return {
                ...state,
                isOpen: action.isOpen,
                isEdit: action.isEdit,
                user: action.user
            }


        default:
            return state;

    }

}
