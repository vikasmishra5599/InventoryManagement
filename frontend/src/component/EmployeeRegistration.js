import React, {useState} from "react";
import {Typography, FormControl, FormControlLabel, Input, InputLabel, Button, Checkbox} from '@mui/material';
import {useStyles} from '../common/Styles';
import Alert from '../common/Alert';
import axios from 'axios';


const EmployeeRegistration = () => {
    const classes = useStyles();
    const [showError, setShowError] = useState(false);
    const initialForm = {
        name: "",
        empId: "",
        emailId: "",
        contactNo: "",
        teamName: "",
        supervisorName: "",
        manager: false
    }

    const [empForm, setEmpForm] = useState(initialForm);

    const handleInputChange = (e) => {
        const fieldName= e.target.name
        const fieldValue = e.target.value

        setEmpForm({
                ...empForm,
            [fieldName]: fieldValue
            }
        );
       console.log(empForm)
    }

    const handleUserRegistration = (e) => {
        e.preventDefault();
        console.log("Before",empForm);
        const inputRequest= JSON.stringify(empForm)

        console.log(inputRequest);

        axios({

            // Endpoint to send files
            url: "/ims/user/create",
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            // Attaching the form data
            data:inputRequest ,
        })

            // Handle the response from backend here
            .then((res) => { console.log("sucesss") })

            // Catch errors if any
            .catch((err) => {  console.log("failure")});

    };

    return (
        <>
            <Typography variant="h6" className={classes.title}>
                Employee Registration
            </Typography>
            {showError && <Alert/>}
            <form className={classes.form} onSubmit={e => handleUserRegistration(e)}>
                <FormControl required margin="normal" fullWidth>
                    <InputLabel htmlFor="name">Name</InputLabel>
                    <Input name="name" aria-describedby="name" onChange={handleInputChange}/>
                </FormControl>

                <FormControl  margin="normal" fullWidth>
                    <InputLabel htmlFor="empId">Employee Id</InputLabel>
                    <Input name="empId" aria-describedby="empId" onChange={handleInputChange}/>
                </FormControl>

                <FormControl  fullWidth>
                    <InputLabel htmlFor="emailId">Email Id</InputLabel>
                    <Input name="emailId" aria-describedby="emailId"
                           onChange={handleInputChange}/>
                </FormControl>

                <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor="contactNo">Contact No</InputLabel>
                    <Input name="contactNo" id="contactNo" aria-describedby="contactNo"
                           onChange={handleInputChange}/>
                </FormControl>

                <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor="teamName">Team Name</InputLabel>
                    <Input name="teamName" id="teamName" aria-describedby="teamName"
                           onChange={handleInputChange}/>
                </FormControl>

                <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor="supervisorName">Supervisor Name</InputLabel>
                    <Input name="supervisorName" id="supervisorName" aria-describedby="supervisorName"
                           onChange={handleInputChange}/>
                </FormControl>

                <FormControl fullWidth margin="normal">
                    <FormControlLabel name="manager" control={<Checkbox/>} label="Is Manager"/>
                </FormControl>

                <Button variant="contained" type="submit" color="primary">
                    Add
                </Button>

            </form>
            <Button href="#" variant="contained" type="submit" color="primary">
                Reset
            </Button>
            <br/>

        </>
    );
}

export default EmployeeRegistration;
