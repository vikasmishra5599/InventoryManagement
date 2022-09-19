import React, {useState} from "react";
import {Button, FormControl, Input, InputLabel, MenuItem, Select, Typography} from '@mui/material';
import Alert from '../common/Alert';
import axios from "axios";
import Success from "../common/Success";
import {getAuthHeader} from "../Utils/TokenUtils";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

const ProductRegistration = () => {

    const initialForm = {
        name: "",
        description: "",
        serialNumber: "",
        type: "",
        status: "",
        trackingId: "",
        location: "",
        comments: "",
    };

    const [showError, setShowError] = useState(false);
    const [productForm, setProductForm] = useState(initialForm);
    const [showSuccess, setShowSuccess] = useState(false);
    const requestHeader = getAuthHeader({'Content-Type': 'application/json'});
    const handleProductRegistration = (e) => {
        e.preventDefault();
        setShowError(false);
        const inputRequest = JSON.stringify(productForm)

        axios({

            url: "/ims/product/create",
            method: "POST",
            headers: requestHeader,
            data: inputRequest,
        })
            .then((res) => {
                setShowError(false)
                setShowSuccess(true);
                setProductForm(initialForm);
                if (productForm.name === "") {
                    setShowSuccess(false);
                }
                console.log(res);
            })
            .catch((err) => {
                console.log(err)
                setProductForm(initialForm);
                setShowSuccess(false);
                setShowError(true)
            });

    };

    const handleInputChange = (e) => {
        setShowError(false);
        setShowSuccess(false);
        const fieldName = e.target.name
        const fieldValue = e.target.value
        setProductForm({
                ...productForm,
                [fieldName]: fieldValue
            }
        );
    };

    const handleResetButton = () => {
        setProductForm(initialForm);
        setShowError(false);
        setShowSuccess(false);
    }

    return (
        <div style={{padding:"5px"}}>
            <Box
                component={Paper}
                sx={{
                    width: 800,
                    height: 700,
                    padding:"30px",
                    borderRadius:"5px",
                }}>
                <Typography variant="h6" style={{ flexGrow: 1}}> Product Registration </Typography>
                {showError && <Alert/>}
                {showSuccess && <Success/>}
                <form onSubmit={handleProductRegistration}>

                    <FormControl required margin="normal" fullWidth>
                        <InputLabel htmlFor="name">Product Name</InputLabel>
                        <Input name="name" aria-describedby="name" value={productForm.name}
                               onChange={handleInputChange}/>
                    </FormControl>

                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="description">Description</InputLabel>
                        <Input name="description" aria-describedby="description" value={productForm.description}
                               onChange={handleInputChange}/>
                    </FormControl>

                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="serialNumber">Serial Number</InputLabel>
                        <Input name="serialNumber" aria-describedby="serialNumber" value={productForm.serialNumber}
                               onChange={handleInputChange}/>
                    </FormControl>

                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="type">Type</InputLabel>
                        <Input name="type" aria-describedby="type" value={productForm.type}
                               onChange={handleInputChange}/>
                    </FormControl>

                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="status">Status</InputLabel>
                        <Input name="status" aria-describedby="status" value={productForm.status}
                               onChange={handleInputChange}/>
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel id="device-location">Location</InputLabel>
                        <Select
                            labelId="device-location-label"
                            id="device-location-select"
                            name={"location"}
                            aria-describedby="status"
                            value={productForm.location}
                            label="Location"
                            onChange={handleInputChange}
                        >
                            <MenuItem value={'Home'}>Home</MenuItem>
                            <MenuItem value={'Office'}>Office</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="comments">Comments</InputLabel>
                        <Input name="comments" aria-describedby="comments" value={productForm.comments}
                               onChange={handleInputChange}/>
                    </FormControl>

                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="trackingId">Tracking ID</InputLabel>
                        <Input name="trackingId" aria-describedby="trackingId" value={productForm.trackingId}
                               onChange={handleInputChange}/>
                    </FormControl>

                    <Button variant="contained" type="submit" color="primary">
                        Add
                    </Button>

                    <Button style={{marginLeft: "10px"}} variant="contained" type="reset" color="primary"
                            onClick={handleResetButton}>
                        Reset
                    </Button>
                </form>
            </Box>
        </div>
    );
}

export default ProductRegistration;
