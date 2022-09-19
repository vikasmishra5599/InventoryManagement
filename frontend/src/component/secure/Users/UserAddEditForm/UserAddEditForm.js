import {Button, Dialog, DialogContent, DialogTitle, FormControl, Typography} from "@mui/material";
import {CloseRounded} from "@mui/icons-material";
import {Form} from 'react-final-form';
import {Switches, TextField} from "../../../../common/FormComponents";
import {useEffect, useState} from "react";
import {isEmpty} from "lodash";
import {checkValidEmail} from "../../../../Utils/Validation/Validation";

export function UserAddEditForm(props) {

    const {
        isOpen,
        handleCancel,
        handleSaveUpdate,
        isEdit,
        setAddEditUserDialogOpen,
        user,
        resetValues,
    } = props;

    const [initialFormValue,setInitialFormValue]= useState({
        ...user,
        isManager:user?.roles?.includes('ROLE_MANAGER')
    });

    const onSubmit = (values, form) => {
        const requestValues = {
            ...values,
        }
        handleSaveUpdate(requestValues);
        setAddEditUserDialogOpen(false, isEdit, undefined);
    };

    useEffect(()=>{
        if (resetValues){
            setInitialFormValue({});
        }
    },[resetValues,setInitialFormValue])

    useEffect(()=>{
        if (isEdit) {
                setInitialFormValue({
                    ...user,
                    isManager:user?.roles?.includes('ROLE_MANAGER')
                })
            }
        else{
            setInitialFormValue({}
            );
        }

    },[isEdit,user,setInitialFormValue]);

    const handleClickCloseIcon = () => (
        setAddEditUserDialogOpen(false, false, undefined)
    )

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
        if (!isEmpty(validateObj)) return validateObj;
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
                    color: "whitesmoke", backgroundColor:"#cf5419", display: "flex",
                    justifyContent: "space-between", alignItems: "center"
                }}>
                    <Typography sx={{fontSize: "1.2rem"}}> {isEdit && isOpen ? `Edit User ${user.firstName} ${user.lastName}` : 'Register User'}</Typography>
                    <CloseRounded onClick={handleClickCloseIcon} sx={{paddingTop: "5px", fontSize: "2rem"}}/>
                </DialogTitle>
                <DialogContent>
                    <Form
                        onSubmit={onSubmit}
                        validate={validate}
                        initialValues={initialFormValue}
                        render={({ handleSubmit, pristine, form, submitting, values }) => (
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
                                    <TextField label="Email" name="email" disabled={isEdit}
                                               helperText={"Email of user"}/>
                                </FormControl>
                                <FormControl fullWidth sx={{m: 1}} variant="standard" id="phone-number-input-id">
                                    <TextField label="Phone No" name="phoneNumber"
                                               helperText={"Phone Number"}/>
                                </FormControl>
                                <FormControl fullWidth sx={{m: 1}} >
                                    <Switches
                                        id="is-manager-switch-id"
                                        name="isManager"
                                        label="Manager Role"
                                        key='id-set-manager-role'
                                        data={{ value: 'isManager' }}
                                    />
                                </FormControl>

                                <FormControl sx={{m: 1}}>
                                    <Button variant="contained" type="submit" id="save-update-button-id"
                                            disabled={submitting || pristine} >
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
