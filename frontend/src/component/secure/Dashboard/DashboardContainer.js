import React, {useEffect, useState} from "react";
import axios from "axios";
import Alert from "../../../common/Alert";
import {CircularProgress} from "@mui/material";
import CustomMUITable from "../../../common/Table/CustomMUITable";
import ProductAssignment from "../../ProductAssignment";
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded';
import {getAuthHeader} from "../../../Utils/TokenUtils";

export default function DashboardContainer (props) {
    const [tableData, setTableData] = useState([]);
    const [assignmentUsers, setAssignmentUsers] = useState([]);
    const [showError, setShowError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [assignProductId,setAssignProductId] = useState(null);

    const handleClose=()=>{
        setOpen(false);
        setAssignProductId(null);
    }


    useEffect(() => {
        fetchListData();
    }, [])

    //getAuthHeader({'Accept-Type': 'application/json'})

    const requestHeader = getAuthHeader({'Accept-Type': 'application/json'});

    const fetchListData = async  () => {
        setLoading(true);
        setShowError(false);

        await axios.get("/ims/dashboard/",
            {headers: requestHeader })
            .then((res) => {
                setTableData(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err)
                setShowError(true);
                setLoading(false);
            });
    }

    useEffect(() => {
        fetchAssignmentUsers();
    }, [])

    const fetchAssignmentUsers = async () => {
        setLoading(true);
        setShowError(false);

        await axios.get("/ims/AuthUser/getAllAssignmentUsersDetails",
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

    const defaultSort = "name";
    const columns =[
        {
            id: 'name',
            numeric: false,
            disablePadding: false,
            label: 'Name',
        },
        {
            id: 'serialNumber',
            numeric: false,
            disablePadding: false,
            label: 'Serial No',
        },
        {
            id: 'owner',
            numeric: false,
            disablePadding: true,
            label: 'Owner',
        },
        {
            id: 'description',
            numeric: false,
            disablePadding: true,
            label: 'description',
        },
        {
            id: 'type',
            numeric: false,
            disablePadding: true,
            label: 'Type',
        },
        {
            id: 'comments',
            numeric: false,
            disablePadding: true,
            label: 'Comments',
        },
        {
            id: 'location',
            numeric: false,
            disablePadding: true,
            label: 'Location',
        },
        {
            id: 'trackingId',
            numeric: false,
            disablePadding: true,
            label: 'Tracking Id',
        },
        {
            id: 'status',
            numeric: false,
            disablePadding: true,
            label: 'Status',
        },
    ];
      const title="Inventory Status Dashboard";
      const customRowsPerPage = [7,10];
      const rowSelectCheckBox = false;
      const  useDensePadding = true;
      const tableWidth = 1200;
      const  rowActions = [
        {
            icon:<PersonAddAlt1RoundedIcon sx={{color:"green"}} />,
            onClickAction: (rowData)=> {
                setAssignProductId(rowData.id);
                setOpen(true);
            },
        },
    ]

    return <>
        {showError && <Alert />}
        {loading && <CircularProgress />}
        <CustomMUITable
            data={tableData}
            defaultSort={defaultSort}
            columns={columns}
            title={title}
            customRowsPerPage={customRowsPerPage}
            rowSelectCheckBox={rowSelectCheckBox}
            useDensePadding={useDensePadding}
            tableWidth={tableWidth}
            rowActions={rowActions}
        />
        <ProductAssignment users={assignmentUsers} open={open} onClose={handleClose} productId={assignProductId}/>
    </>
}
