import {Button, Card, CardContent, CardHeader, Grid, Link, TextField, Typography} from "@mui/material";
import {useState} from "react";
import * as _ from "lodash";
import {useHistory} from "react-router-dom";
import Image from "../../../Assets/Images/ALLE-WHITE.png";
import * as React from "react";

function LoginCard(props) {

    const {
        login,
    } = props;

    let history = useHistory();

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({userNameError: undefined, passwordError: undefined});

    const resetError = () => {
        setError({userNameError: '', passwordError: ''})
    }

    const onUserNameChange = (event) => {
        setUserName(event?.target?.value);
    };

    const onPasswordChange = (event) => (setPassword(event?.target?.value));

    function validate(){
        resetError();
        let isValid = true;
        const error = {
            userNameError: '',
            passwordError: ''
        };
        if (_.isEmpty(userName)) {
            error.userNameError ="User Name Required";
            isValid = false;
        }
        if (_.isEmpty(password)) {
            error.passwordError = "Password Required";
            isValid = false;
        }
        setError(error);
        return isValid;
    }

    function onLoginButtonClick() {
        if (validate()) {
            login( userName,password);
        }
    }

    function onForgotPasswordLinkClick() {
        history.push('/forgotpassword');
    }

    // background: "rgba(235, 235, 245, 0.8)",

    return (<Grid
        container
        spacing={2}
        direction={"column"}
        alignContent={"center"}
        alignItems={"center"}
        justifyContent={"center"}
        style={{minHeight: '100vh'}}>
        <Card sx={{
            minWidth: 275, maxWidth: 330, textAlign: "center", width: 330,
        }}>
            <CardHeader title={
                 <>
                    <img src={"/ims"+Image} alt="" id="appbar-logo" style={{padding: "2px 0px 2px 0px", height: "45px" }}/>
                    <Typography variant="h6" sx={{fontWeight:"600"}}>INVENTORY</Typography>
                </>}
                style={{ backgroundColor:"#cf5419" , color : "#f0f0f0" , fontSize:"1.1rem"}}/>
            <CardContent sx={{paddingTop: "10px"}}>
                <form>
                    <Grid container rowSpacing={2} style={{justifyContent: "center",paddingTop:"25px"}}>
                        <Grid item style={{justifyContent: "center",paddingTop:"25px"}}>
                            <TextField sx={{width: '32ch' }}
                                error={!(!error.userNameError)}
                                id="login-email"
                                label="Email"
                                onChange={onUserNameChange}
                                helperText={error.userNameError}
                            />
                        </Grid>
                        <Grid item style={{justifyContent: "center",paddingTop:"25px"}}>
                            <TextField sx={{width: '32ch' }}
                                error={!(!error.passwordError)}
                                id="login-password"
                                label="Password"
                                type="password"
                                onChange={onPasswordChange}
                                helperText={error.passwordError}
                            />
                        </Grid>
                        <Grid item style={{justifyContent: "center",paddingTop:"25px"}}>
                            <Button variant="contained" color="unSecure" id="login-button" onClick={onLoginButtonClick}> Login </Button>
                        </Grid>
                    </Grid>
                </form>
                <Grid item style={{padding:"5px"}}>
                    <Link id="forgot-password-link"
                        component="button"
                        onClick={onForgotPasswordLinkClick}
                    >
                        Forgot Password
                    </Link>
                </Grid>
            </CardContent>
        </Card>
    </Grid>);
}

export default LoginCard;
