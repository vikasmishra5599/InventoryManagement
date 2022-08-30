import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {StyledTableCell, StyledTableRow} from "./tablestyle";

const CustomizedTables = (props) => {
    const {rows} = props
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell > Product Id</StyledTableCell>
                        <StyledTableCell align="right">Product Name</StyledTableCell>
                        <StyledTableCell align="right">Serial No</StyledTableCell>
                        <StyledTableCell align="right">Owner</StyledTableCell>
                        <StyledTableCell align="right">Team Leader</StyledTableCell>
                        <StyledTableCell align="right">Status</StyledTableCell>
                        <StyledTableCell align="right">Device Location</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows && rows.map((row) => (
                        <StyledTableRow key={row.productId}>
                            <StyledTableCell component="th" scope="row">
                                {row.productId}
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.productName}</StyledTableCell>
                            <StyledTableCell align="right">{row.serialNo}</StyledTableCell>
                            <StyledTableCell align="right">{row.owner}</StyledTableCell>
                            <StyledTableCell align="right">{row.teamLeader}</StyledTableCell>
                            <StyledTableCell align="right">{row.status}</StyledTableCell>
                            <StyledTableCell align="right">{row.location}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CustomizedTables;