import React, {useState} from "react";
import {Button, Dialog, DialogTitle, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import axios from "axios";
import Alert from "../common/Alert";
import Success from "../common/Success";

const ProductAssignment = (props) => {
    const {open, onClose,productId} = props;

    const initialForm = {
        assignedTo: "",
        comments: "",
    };
    console.log('product Id in product Assignment page :',productId);
    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [assignmentForm, setAssignmentFormForm] = useState(initialForm);


    const handleInputChange = (e) => {
        // setShowError(false);
        // setShowSuccess(false);

        const fieldName = e.target.name
        const fieldValue = e.target.value
        setAssignmentFormForm({
                ...assignmentForm,
                [fieldName]: fieldValue
            }
        );
    };

    const handleAssignment = (e) => {
        e.preventDefault();
        onClose();
        console.log("assignmentForm :",assignmentForm)
        // setShowError(false);
        // const inputRequest = JSON.stringify(productForm)
        //
        // axios({
        //
        //     url: "/ims/product/create",
        //     method: "POST",
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     data: inputRequest,
        // })
        //     .then((res) => {
        //         setShowError(false)
        //         setShowSuccess(true);
        //         setProductForm(initialForm);
        //         if(productForm.name === ""){
        //             setShowSuccess(false);
        //         }
        //         // setLocation("");
        //         console.log(res);
        //     })
        //     .catch((err) => {
        //         console.log(err)
        //         setProductForm(initialForm);
        //         setShowSuccess(false);
        //         // setLocation("");
        //         setShowError(true)
        //     });

    };
    return (

        <Dialog onClose={onClose} open={open}>
            <DialogTitle>Assign a product to someone</DialogTitle>
            {showError && <Alert/>}
            {showSuccess && <Success/>}
            <form onSubmit={handleAssignment}>
                <FormControl fullWidth>
                    <InputLabel id="product-assignment">Select User</InputLabel>
                    <Select
                        labelId="product-assignment-label"
                        id="product-assignment-select"
                        name={"assignedTo"}
                        aria-describedby="status"
                        value={assignmentForm.assignedTo}
                        label="Location"
                        onChange={handleInputChange}
                    >
                        <MenuItem value={'Home'}>Home</MenuItem>
                        <MenuItem value={'Office'}>Office</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="contained" type="submit" color="primary">
                    Assign
                </Button>
                <Button style={{marginLeft: "10px"}} variant="contained" type="reset" color="primary"
                        onClick={onClose}>
                    Close
                </Button>

            </form>
        </Dialog>
    );
};

export default ProductAssignment;

