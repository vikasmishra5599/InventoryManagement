import {Button, Card, CardContent, CardHeader, Grid, Link, TextField} from "@mui/material";
import {useState} from "react";
import * as _ from "lodash";
import {useHistory} from "react-router-dom";

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
            minWidth: 275, maxWidth: 300, textAlign: "center", width: 330,
        }}>
            <CardHeader title={'Allegion Inventory'} style={{ backgroundColor:"#cf5419" , color : "#f0f0f0" , fontSize:"1.2rem"}}/>
            <CardContent>
                <form>
                    <Grid container rowSpacing={2} style={{justifyContent: "center"}}>
                        <Grid item>
                            <TextField
                                error={!(!error.userNameError)}
                                id="login-email"
                                label="Email"
                                onChange={onUserNameChange}
                                helperText={error.userNameError}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                error={!(!error.passwordError)}
                                id="login-password"
                                label="Password"
                                type="password"
                                onChange={onPasswordChange}
                                helperText={error.passwordError}
                            />
                        </Grid>
                        <Grid item>
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
