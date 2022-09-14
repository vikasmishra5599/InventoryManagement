import React, {useEffect, useState} from "react";
import axios from "axios";
import Alert from "../../../common/Alert";
import CustomMUITable from "../../../common/Table/CustomMUITable";
import ProductAssignment from "../../ProductAssignment";
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded';
import {getAuthHeader} from "../../../Utils/TokenUtils";
import ListIcon from '@mui/icons-material/List';
import Tooltip from "@mui/material/Tooltip";
import ProductAuditDialog from "./ProductAudit/ProductAuditDialog";

export default function DashboardContainer (props) {
    const [tableData, setTableData] = useState([]);
    const [assignmentUsers, setAssignmentUsers] = useState([]);
    const [showError, setShowError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [assignProductId,setAssignProductId] = useState(null);
    const [auditOpen, setAuditOpen] = React.useState(false);
    const [auditProductId,setAuditProductId] = useState(null);

    const handleClose=()=>{
        setOpen(false);
        setAssignProductId(null);
    }

    const handleAuditClose=()=>{
        setAuditOpen(false);
        setAuditProductId(null);
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
            label: 'Product Name',
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
      const title="Dashboard";
      const customRowsPerPage = [10,15];
      const rowSelectCheckBox = false;
      const  useDensePadding = true;
      const tableWidth = 1200;
    const rowActions = [
        {
            icon: <Tooltip title="Assign" placement="top">
                <PersonAddAlt1RoundedIcon sx={{color: "green"}}/>
            </Tooltip>,
            onClickAction: (rowData) => {
                setAssignProductId(rowData.id);
                setOpen(true);
            },
        },
        {
            icon: <Tooltip title="Audit" placement="top">
                <ListIcon sx={{color: "green"}}/>
            </Tooltip>,
            onClickAction: (rowData) => {
                setAuditProductId(rowData.id);
                setAuditOpen(true);
            }
        }
    ]

    return <>
        {showError && <Alert />}
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
            isLoading={loading}
        />
        <ProductAssignment users={assignmentUsers} open={open} onClose={handleClose} productId={assignProductId}/>
        <ProductAuditDialog isOpen={auditOpen} onClose={handleAuditClose}  productId={auditProductId}/>
    </>
}
