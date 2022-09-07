import {Button, Card, CardContent, CardHeader, Grid, Link, TextField} from "@mui/material";
import {useState} from "react";
import {isEmpty} from "lodash";
import {checkValidEmail} from "../../../Utils/Validation/Validation";


function ForgotPasswordCard(props) {

    const {
        forgotPassword,
        push
    } = props;

    const [email, setEmail] = useState("");

    const [emailError, setEmailError] = useState("");

    const onEmailChange = (event) => (setEmail(event?.target?.value));

    function resetError(){
        setEmailError("");
    }

    function validate(){
        resetError();
        let isValid = true;
        let error ="";
        if (isEmpty(email)){
            error ="Email id is required";
            isValid = false;
        }else if (!checkValidEmail(email)){
            error ="Email id is invalid";
            isValid = false;
        }
        setEmailError(error);
      return isValid;
    };

    function onClickResetPassword() {
        if (validate()){
            forgotPassword({email : email});
        }
    };

    function onBackToLoginClick(){
        push("/");
    };

    return (<Grid
        container
        spacing={2}
        direction={"column"}
        alignContent={"center"}
        alignItems={"center"}
        justifyContent={"center"}
        style={{minHeight: '100vh'}}>
        <Card sx={{
            minWidth: 300, maxWidth: 380, background: "rgba(235, 235, 245, 0.8)", textAlign: "center", width: 350,
        }}>
            <CardHeader title="Forgot Password" style={{backgroundColor:"#0f248d" , color : "#f1f4f6", fontSize :"1.2rem"}}/>
            <CardContent>
                <form>
                    <Grid container rowSpacing={3} style={{justifyContent:"center"}}>
                        <Grid item>
                            <TextField
                                error={!(!emailError)}
                                id="login-email"
                                label="Login Email"
                                onChange={onEmailChange}
                                helperText={emailError}
                            />
                        </Grid>
                        <Grid item >
                            <Button variant="contained" onClick={onClickResetPassword}>Send Reset Link</Button>
                        </Grid>
                    </Grid>
                </form>
                    <Grid item style={{padding:"5px"}}>
                        <Link
                            component="button"
                            onClick={onBackToLoginClick}
                        >
                            Back to Login
                        </Link>
                    </Grid>
            </CardContent>
        </Card>
    </Grid>);
}

export default ForgotPasswordCard;
