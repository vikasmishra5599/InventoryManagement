import {Button, Dialog, DialogContent, DialogTitle, FormControl, Typography} from "@mui/material";
import {CloseRounded} from "@mui/icons-material";
import {Form} from 'react-final-form';
import {Switches, TextField} from "../../../../common/FormComponents";
import {useState} from "react";
import {isEmpty} from "lodash";
import {checkValidEmail} from "../../../../Utils/Validation/Validation";

export function UserAddEditForm(props) {

    const {
        isOpen,
        handleCancel,
        handleSaveUpdate,
        isEdit,
        setAddEditUserDialogOpen,
        user
    } = props;

    console.log('UserAddEditForm props', props);

    const [isManager, setIsManagerInput] = useState(false);

    const onSubmit = (values, form) => {
        console.log(` onSubmit `, values)
        const requestValues = {
            ...values,
            isManager : isManager
        }
        console.log(' Req val ', requestValues);
        handleSaveUpdate(requestValues);
        /*Object.keys(values).forEach(key => {
            form.change(key, undefined) && form.resetFieldState(key)
        });*/
    };

    const handleClickCloseIcon = () => (
        setAddEditUserDialogOpen(false, false, undefined)
    )

    const handleIsManagerCheck = (event) => {
        setIsManagerInput(event.target.checked);
    }


    async function validate(values) {
        let validateObj ={};
        if (isEmpty(values.firstName) ){
            validateObj.firstName = `First Name is Required `
        }
        if (isEmpty(values.email) ){
            validateObj.email= `Email is Required `

        }else if (!checkValidEmail(values.email)){
            validateObj.email= `Email is not valid `
        }
        if (!isEmpty(validateObj))return validateObj;
    }

    const onClose = (event, reason) => {
        if(reason !== "backdropClick") {
            handleCancel();
        }
    }


    return (
        <div>
            <Dialog open={isOpen} onClose={onClose}>
                <DialogTitle style={{
                    color: "whitesmoke", backgroundColor: "#1f4fef", display: "flex",
                    justifyContent: "space-between", alignItems: "center"
                }}>
                    <Typography sx={{fontSize: "1.2rem"}}> {isEdit ? 'Edit User' : 'Register User'}</Typography>
                    <CloseRounded onClick={handleClickCloseIcon} sx={{paddingTop: "5px", fontSize: "2rem"}}/>
                </DialogTitle>
                <DialogContent>
                    <Form
                        onSubmit={onSubmit}
                        validate={validate}
                        render={({handleSubmit, values}) => (
                            <>
                            <form onSubmit={handleSubmit}>
                                <FormControl fullWidth sx={{m: 1}} variant="standard" id="first-name-input-id">
                                    <TextField label="First Name " name="firstName"
                                               helperText={"First name of User"}/>
                                </FormControl>
                                <FormControl fullWidth sx={{m: 1}} variant="standard" id="last-name-input-id">
                                    <TextField label="Last Name " name="lastName"
                                               helperText={"Last name of User"}/>
                                </FormControl>
                                <FormControl fullWidth sx={{m: 1}} variant="standard" id="email-input-id">
                                    <TextField label="Email" name="email"
                                               helperText={"Email of user"}/>
                                </FormControl>
                                <FormControl fullWidth sx={{m: 1}} variant="standard" id="phone-number-input-id">
                                    <TextField label="Phone No" name="phoneNumber"
                                               helperText={"Phone Number"}/>
                                </FormControl>
                                <FormControl fullWidth sx={{m: 1}} variant="standard">
                                    <Switches
                                        id="is-manager-switch-id"
                                        name="isManager"
                                        key='id-set-serial-number-input'
                                        onChange={handleIsManagerCheck}
                                        checked={isManager}
                                        data={{label: (isManager) ? ' User will be Assigned Manger role' :'Is Manager', value: {isManager}, checked: {isManager}}}
                                    />
                                </FormControl>

                                <FormControl sx={{m: 1}}>
                                    <Button variant="contained" type="submit" id="save-update-button-id">
                                        {isEdit ? 'Update User' : 'Register User'}
                                    </Button>
                                </FormControl>
                            </form>
                            </>)}
                    />
                </DialogContent>
            </Dialog>
        </div>
    )
}
