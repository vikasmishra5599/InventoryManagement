import {ADD_EMPLOYEE} from "../actionTypes";

const addEmployee = (state = "default value", action) => {
    switch (action.type) {
        case ADD_EMPLOYEE : {
            return "added successfully";
        }
        default: {
            return state;
        }
    }
}

export default addEmployee;
