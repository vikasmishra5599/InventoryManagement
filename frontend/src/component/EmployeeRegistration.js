import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import { Typography, FormControl, FormControlLabel, Input, InputLabel, Button, Checkbox } from '@mui/material';
import { useStyles } from '../common/Styles';
import Alert from '../common/Alert';

const EmployeeRegistration = () => {
    const classes = useStyles();
    const [showError, setShowError] = useState(false);
    const { register, handleSubmit } = useForm();
    
    const handleUserRegistration = (values) => {
        setShowError(true);
    };
      
    return (
        <>
            <Typography variant="h6" className={classes.title}>
              Employee Registration
            </Typography>
            {showError && <Alert />}
            <form className={classes.form} onSubmit={handleSubmit(handleUserRegistration)}>
              <FormControl equired margin="normal" fullWidth>
                <InputLabel htmlFor="name">Name</InputLabel>
                <Input {...register('name')} id="name" aria-describedby="name" />
              </FormControl>

              <FormControl equired margin="normal" fullWidth>
                <InputLabel htmlFor="empId">Employee Id</InputLabel>
                <Input {...register('empId')}  id="empId" aria-describedby="empId" />
              </FormControl>

              <FormControl equired fullWidth>
                <InputLabel htmlFor="emailId">Email Id</InputLabel>
                <Input {...register('emailId')}  id="emailId" aria-describedby="emailId" />
              </FormControl>

              <FormControl equired margin="normal" fullWidth>
                <InputLabel htmlFor="contactNo">Contact No</InputLabel>
                <Input {...register('contactNo')} id="contactNo" aria-describedby="contactNo" />
              </FormControl>

              <FormControl equired margin="normal" fullWidth>
                <InputLabel htmlFor="teamName">Team Name</InputLabel>
                <Input {...register('teamName')} id="teamName" aria-describedby="teamName" />
              </FormControl>

              <FormControl equired margin="normal" fullWidth>
                <InputLabel htmlFor="supervisorName">Supervisor Name</InputLabel>
                <Input {...register('supervisorName')}  id="supervisorName" aria-describedby="supervisorName" />
              </FormControl>

              <FormControl required fullWidth margin="normal">
                <FormControlLabel {...register('manager')} control={<Checkbox />} label="Is Manager" />
              </FormControl>

              <Button variant="contained" type="submit" color="primary">
                Add
              </Button>
            </form>
        </>
      );    
}

export default EmployeeRegistration;
