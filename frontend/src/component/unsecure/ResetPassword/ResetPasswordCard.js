import {Button, Card, CardContent, CardHeader, Grid, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import * as _ from "lodash";

function ResetPasswordCard(props) {

    const {
        saveResetPassword,
        push
    } = props;

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState({passwordError: undefined, confirmPasswordError: undefined, });
    const [resetKey, setResetKey] = useState("");

    const resetError = () => {
        setError({userNameError: '', passwordError: ''})
    }

    const onConfirmPasswordChange = (event) => (setConfirmPassword(event?.target?.value));

    const onPasswordChange = (event) => (setPassword(event?.target?.value));

    function initializeFields(){
        setPassword("");
        setConfirmPassword("");
    }

    function validate(){
        resetError();
        let isValid = true;
        const error = {
            userNameError: '',
            passwordError: ''
        };
        if (_.isEmpty(password)) {
            error.passwordError ="password Required";
            isValid = false;
        }
        if (_.isEmpty(confirmPassword)) {
            error.confirmPasswordError = "confirm password Required";
            isValid = false;
        }else if (!_.isEqual(password,confirmPassword)){
            error.confirmPasswordError = "confirm password doesn't match";
            isValid = false;
        }else{
            return true;
        }
        setError(error);
        return isValid;
    }

    function onSavePasswordClick() {
        if (validate()) {
            saveResetPassword({
                key: resetKey, password: password
            });
            initializeFields();
        }
    }

    useEffect(()=>{
        let url = new URL(window.location.href);
        let key = url.searchParams.get("key");
        setResetKey(key);
    },[setResetKey]);


    return (<Grid
        container
        spacing={2}
        direction={"column"}
        alignContent={"center"}
        alignItems={"center"}
        justifyContent={"center"}
        style={{minHeight: '100vh'}}>
        <Card sx={{
            minWidth: 275, maxWidth: 300, background: "rgba(235, 235, 245, 0.8)", textAlign: "center", width: 330,
        }}>
            <CardHeader title={'Reset Password'} style={{backgroundColor:"#0f248d" , color : "#f1f4f6"}}/>
            <CardContent>
                <form>
                    <Grid container rowSpacing={2} style={{justifyContent: "center"}}>
                        <Grid item>
                            <TextField
                                error={!(!error.passwordError)}
                                id="password"
                                label="Password"
                                type="password"
                                onChange={onPasswordChange}
                                value={password}
                                helperText={error.passwordError}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                error={!(!error.confirmPasswordError)}
                                id="confirm-password"
                                label="Confirm Password"
                                type="password"
                                value={confirmPassword}
                                onChange={onConfirmPasswordChange}
                                helperText={error.confirmPasswordError}
                            />
                        </Grid>
                        <Grid item>
                            <Button variant="contained" id="save-password" onClick={onSavePasswordClick}> Save Password </Button>
                        </Grid>
                    </Grid>
                </form>
            </CardContent>
        </Card>
    </Grid>);
}

export default ResetPasswordCard;
