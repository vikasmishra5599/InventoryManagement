import {SAVE_REG_UPDATE_USER_RESPONSE,
    SET_ADD_USER_DIALOG_OPEN} from "../actionTypes";


const initialState ={
    isOpen : false,
    user : {},
    isEdit:false,
    resetValues: false,
}

export default function AddEditUserDialog(state = initialState, action){

    switch (action.type)
    {
        case SET_ADD_USER_DIALOG_OPEN:
            return {
                ...state,
                isOpen: action.isOpen,
                isEdit: action.isEdit,
                user: action.user,
                resetValues: false,
            }

        case SAVE_REG_UPDATE_USER_RESPONSE:
            return {
                ...state,
                resetValues: true
            }

        default:
            return state;

    }

}
