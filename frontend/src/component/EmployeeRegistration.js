import React, {useState} from "react";
import {Typography, FormControl, FormControlLabel, Input, InputLabel, Button, Checkbox} from '@mui/material';
import {useStyles} from '../common/Styles';
import Alert from '../common/Alert';
import axios from 'axios';


const EmployeeRegistration = () => {
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
    const [showError, setShowError] = useState(false);
    const classes = useStyles();

    const handleInputChange = (e) => {
        setShowError(false)
        const fieldName = e.target.name
        const fieldValue = e.target.value

        setEmpForm({
                ...empForm,
                [fieldName]: fieldValue
            }
        );
    }

    const handleResetButton = () => {
        setEmpForm(initialForm);
        setShowError(false)
    }

    const handleManagerAccess = (e) => {
        setEmpForm({
                ...empForm,
                manager: e.target.checked
            }
        );
    }

    const handleUserRegistration = (e) => {
        e.preventDefault();
        const inputRequest = JSON.stringify(empForm)

        axios({
            url: "/ims/employee/create",
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            data: inputRequest,
        })
            .then((res) => {
                setShowError(false)
                console.log(res);
            })
            .catch((err) => {
                console.log(err)
                setShowError(true)
            });

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

                <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor="empId">Employee Id</InputLabel>
                    <Input name="empId" aria-describedby="empId" onChange={handleInputChange}/>
                </FormControl>

                <FormControl fullWidth>
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
                    <FormControlLabel name="manager" control={<Checkbox/>} label="Is Manager"
                                      onChange={handleManagerAccess}/>
                </FormControl>

                <Button variant="contained" type="submit" color="primary">
                    Add
                </Button>

            </form>
            <br/>
            <Button variant="contained" type="submit" color="primary"  onChange={handleResetButton}>
                Reset
            </Button>
        </>
    );
}

export default EmployeeRegistration;
