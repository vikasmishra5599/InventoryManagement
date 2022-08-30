import React, {useState} from "react";
import {Typography, FormControl, Input, InputLabel, Button} from '@mui/material';
import {useStyles} from '../common/Styles';
import Alert from '../common/Alert';
import axios from "axios";

const ProductRegistration = () => {

    const initialForm = {
        name: "",
        description: "",
        serialNo: "",
        type: "",
        status: "",
        trackingId: "",
        assignedTo:""
    };

    const classes = useStyles();
    const [showError, setShowError] = useState(false);
    const [productForm, setProductForm] = useState(initialForm);

    const handleProductRegistration = (values) => {
        setShowError(false);
        const inputRequest = JSON.stringify(productForm)

        axios({

            url: "/ims/product/create",
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

    const handleInputChange = (e) => {
        setShowError(false)
        const fieldName = e.target.name
        const fieldValue = e.target.value

        setProductForm({
                ...productForm,
                [fieldName]: fieldValue
            }
        );
    };


    return (
        <>
            <Typography variant="h6" className={classes.title}>
                Product Registration
            </Typography>
            {showError && <Alert/>}

            <form className={classes.form} onSubmit={handleProductRegistration}>

                <FormControl required margin="normal" fullWidth>
                    <InputLabel htmlFor="name">Product Name</InputLabel>
                    <Input name="name" aria-describedby="name" onChange={handleInputChange}/>
                </FormControl>

                <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor="description">Description</InputLabel>
                    <Input name="description" aria-describedby="description" onChange={handleInputChange}/>
                </FormControl>

                <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor="serialNo">Serial Number</InputLabel>
                    <Input name="serialNo" aria-describedby="serialNo" onChange={handleInputChange}/>
                </FormControl>

                <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor="type">Type</InputLabel>
                    <Input name="type" aria-describedby="type" onChange={handleInputChange}/>
                </FormControl>

                <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor="status">Status</InputLabel>
                    <Input name="status" aria-describedby="status" onChange={handleInputChange}/>
                </FormControl>

                <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor="trackingId">Tracking ID</InputLabel>
                    <Input name="trackingId" aria-describedby="trackingId" onChange={handleInputChange}/>
                </FormControl>

                <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor="ownedBy">Assigned To</InputLabel>
                    <Input name="assignedTo" aria-describedby="assignedTo" onChange={handleInputChange}/>
                </FormControl>

                <Button variant="contained" type="submit" color="primary">
                    Add
                </Button>
            </form>
        </>
    );
}

export default ProductRegistration;