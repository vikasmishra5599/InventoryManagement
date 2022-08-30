import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import { Typography, FormControl, Input, InputLabel, Button } from '@mui/material';
import { useStyles } from '../common/Styles';
import Alert from '../common/Alert';

const ProductRegistration = () => {
    const classes = useStyles();
    const [showError, setShowError] = useState(false);
    const { register, handleSubmit } = useForm();
    
    const handleProductRegistration = (values) => {
        setShowError(true);
    };

    return (
        <>
            <Typography variant="h6" className={classes.title}>
              Product Registration
            </Typography>
            {showError && <Alert />}
            <form className={classes.form} onSubmit={handleSubmit(handleProductRegistration)}>
              <FormControl equired margin="normal" fullWidth>
                <InputLabel htmlFor="productname">Product Name</InputLabel>
                <Input {...register('productname')} id="productname" aria-describedby="productname" />
              </FormControl>

              <FormControl equired margin="normal" fullWidth>
                <InputLabel htmlFor="description">Description</InputLabel>
                <Input {...register('description')}  id="description" aria-describedby="description" />
              </FormControl>

              <FormControl equired margin="normal" fullWidth>
                <InputLabel htmlFor="serialNo">Serial Number</InputLabel>
                <Input {...register('serialNo')} id="serialNo" aria-describedby="serialNo" />
              </FormControl>

              <FormControl equired margin="normal" fullWidth>
                <InputLabel htmlFor="type">Type</InputLabel>
                <Input {...register('type')}  id="type" aria-describedby="type" />
              </FormControl>

              <FormControl equired margin="normal" fullWidth>
                <InputLabel htmlFor="status">Status</InputLabel>
                <Input {...register('status')} id="status" aria-describedby="status" />
              </FormControl>

              <FormControl equired margin="normal" fullWidth>
                <InputLabel htmlFor="trackingId">Tracking ID</InputLabel>
                <Input {...register('trackingId')}  id="trackingId" aria-describedby="trackingId" />
              </FormControl>

              <FormControl equired margin="normal" fullWidth>
                <InputLabel htmlFor="addedBy">Added By</InputLabel>
                <Input {...register('addedBy')}  id="addedBy" aria-describedby="addedBy" />
              </FormControl>

              <FormControl equired margin="normal" fullWidth>
                <InputLabel htmlFor="addedTime">Added Time</InputLabel>
                <Input {...register('addedTime')}  id="addedTime" aria-describedby="addedTime" />
              </FormControl>

              <Button variant="contained" type="submit" color="primary">
                Add
              </Button>
            </form>
        </>
      );    
}

export default ProductRegistration;