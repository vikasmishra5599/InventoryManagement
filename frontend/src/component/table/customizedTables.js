import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {StyledTableCell, StyledTableRow} from "./tablestyle";
import {Button} from "@mui/material";
import ProductAssignment from "../ProductAssignment";

const CustomizedTables = (props) => {
    const [open, setOpen] = React.useState(false);
    const [productId, setProductId] = React.useState(null);
    const {rows} = props;

    const handleClickOpen = (e,id) => {
        setOpen(true);
        setProductId(id);
    };

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <TableContainer style={{"width": "800px"}} component={Paper}>
            <Table aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="left">Product Name</StyledTableCell>
                        <StyledTableCell align="left">Serial No</StyledTableCell>
                        <StyledTableCell align="left">Owner</StyledTableCell>
                        <StyledTableCell align="left">Description</StyledTableCell>
                        <StyledTableCell align="left">Type</StyledTableCell>
                        <StyledTableCell align="left">Comments</StyledTableCell>
                        <StyledTableCell align="left">Location</StyledTableCell>
                        <StyledTableCell align="left">Tracking ID</StyledTableCell>
                        <StyledTableCell align="left">Status</StyledTableCell>
                        <StyledTableCell align="left">Assign Product</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows && rows.map((row) => (
                        <StyledTableRow key={row.id}>
                            <StyledTableCell align="left">{row.name}</StyledTableCell>
                            <StyledTableCell align="left">{row.serialNumber}</StyledTableCell>
                            <StyledTableCell align="left">{row.owner}</StyledTableCell>
                            <StyledTableCell align="left">{row.description}</StyledTableCell>
                            <StyledTableCell align="left">{row.type}</StyledTableCell>
                            <StyledTableCell align="left">{row.comments}</StyledTableCell>
                            <StyledTableCell align="left">{row.location}</StyledTableCell>
                            <StyledTableCell align="left">{row.trackingId}</StyledTableCell>
                            <StyledTableCell align="left">{row.status}</StyledTableCell>
                            <Button align="left" onClick={event => handleClickOpen(event,row.id)}>Assign</Button>
                        </StyledTableRow>
                    ))}
                </TableBody>
                <ProductAssignment  open={open} onClose={handleClose} productId={productId}/>
            </Table>
        </TableContainer>
    );
};

export default CustomizedTables;