import React, {useState, useEffect} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@mui/material";
import axios from "axios";
import Alert from "../common/Alert";
import Success from "../common/Success";
import {getAuthHeader} from "../Utils/TokenUtils";
import TableLoading from "../common/Table/TableLoading";

const ProductAssignment = (props) => {
    const {open, onClose, productId} = props;

    const initialForm = {
        assignedTo: "",
        comments: "",
    };
    const [assignmentUsers, setAssignmentUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [assignmentForm, setAssignmentFormForm] = useState(initialForm);
    const requestHeader = getAuthHeader({'Content-Type': 'application/json'});


    const handleInputChange = (e) => {
        setShowError(false);
        setShowSuccess(false);
        setLoading(false);
        const fieldName = e.target.name
        const fieldValue = e.target.value
        setAssignmentFormForm({
                ...assignmentForm,
                [fieldName]: fieldValue
            }
        );
    };

    const handleClose = () => {
        setShowError(false);
        setShowSuccess(false);
        setLoading(false);
        onClose();
        setAssignmentFormForm(initialForm);
    };

    useEffect(() => {
        if (open) {
            fetchAssignmentUsers();
        }
    }, [open])

    const fetchAssignmentUsers = async () => {
        setLoading(true);
        setShowError(false);

        await axios.get(`/ims/AuthUser/getAllAssignmentUsersDetails/${productId}`,
            {headers: requestHeader})
            .then((res) => {
                setAssignmentUsers(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err)
                setShowError(true);
                setLoading(false);
            });
    }

    const handleAssignment = (e) => {
        e.preventDefault();
        onClose();
        setAssignmentFormForm(initialForm);
        setShowError(false);
        setShowSuccess(false);
        setLoading(false);
        const inputRequest = JSON.stringify(assignmentForm)

        axios({
            url: `/ims/product/assign/${productId}`,
            method: "POST",
            headers: requestHeader,
            data: inputRequest,
        })
            .then((res) => {
                setShowError(false);
                setShowSuccess(true);
                setAssignmentFormForm(initialForm);
                console.log(res);
            })
            .catch((err) => {
                console.log(err)
                setAssignmentFormForm(initialForm);
                setShowSuccess(false);
                setShowError(true)
            });
    };

    return (
        <div>
            {showError && <Alert/>}
            {showSuccess && <Success message={"Product Assigned Successfully"}/>}
            {<TableLoading renderLoading={loading}/>}
            <Dialog onClose={onClose} open={open}>
                <DialogTitle style={{
                    color: "whitesmoke", backgroundColor: "#cf5419", display: "flex",
                    justifyContent: "space-between", alignItems: "center"
                }}>
                    <Typography sx={{fontSize: "1.2rem"}}> Assign product to a user</Typography>
                </DialogTitle>
                {showError && <Alert/>}
                {showSuccess && <Success/>}
                <DialogContent>
                <form onSubmit={handleAssignment}>
                    <FormControl fullWidth sx={{m: 1}} variant="standard" id="first-name-input-id">
                        <InputLabel id="product-assignment">Select Users</InputLabel>
                        <Select
                            required={true}
                            labelId="product-assignment-label"
                            id="product-assignment-select"
                            name={"assignedTo"}
                            aria-describedby="status"
                            value={assignmentForm.assignedTo}
                            label="Select Users"
                            onChange={handleInputChange}
                        >{assignmentUsers && assignmentUsers.map((user,index) => (
                            <MenuItem key={index+1} value={user.id}>{`${user.firstName} ${user.lastName} (${user.email})`}</MenuItem>
                        ))}
                        </Select>
                    </FormControl>
                    <TextField  fullWidth sx={{m: 1}} id={'product-assignment-text'} label={"Comments"} name={"comments"}
                               value={assignmentForm.comments} onChange={handleInputChange}/>
                    <DialogActions>
                    <Button variant="contained" type="submit" color="primary">
                        Assign
                    </Button>
                    <Button style={{marginLeft: "10px"}} variant="contained" type="reset" color="primary"
                            onClick={handleClose}>
                        Close
                    </Button>
                    </DialogActions>
                </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ProductAssignment;

