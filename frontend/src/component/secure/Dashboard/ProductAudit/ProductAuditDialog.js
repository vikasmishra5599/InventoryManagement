import {Dialog, DialogContent, DialogTitle, Typography} from "@mui/material";
import {CloseRounded} from "@mui/icons-material";
import CustomMUITable from "../../../../common/Table/CustomMUITable";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {getAuthHeader} from "../../../../Utils/TokenUtils";
import Alert from "../../../../common/Alert";


function ProductAuditDialog(props){

    const{
        productId,
        isOpen,
        onClose,
    }=props;

    const [loading, setLoading] = useState(false);
    const [showError, setShowError] = useState(false);
    const [tableData, setTableData] = useState([]);

    const requestHeader = getAuthHeader({'Accept-Type': 'application/json'});

    const fetchListData = async  (prodId) => {
        setLoading(true);
        setShowError(false);
        setTableData([]);

        await axios.get(`/ims/audits/product/${prodId}`,
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
        if (isOpen && productId)
            fetchListData(productId);
    }, [productId,isOpen]);


    const columns=[
        {id:'assignedTo',
            numeric: false,
            disablePadding: false,
            label: 'Assigned To',
        },
        {id:'assignedStartDate',
            numeric: false,
            disablePadding: true,
            label: 'Assigned Start date',
            render:(rowData)=> new Date(rowData?.assignedStartDate?.substring(0,19) + "z").toLocaleString(),
        },
        {id:'assignedEndDate',
            numeric: false,
            disablePadding: true,
            label: 'Assigned End date',
            render:(rowData)=> rowData?.assignedEndDate? new Date(rowData?.assignedEndDate?.substring(0,19) + "z").toLocaleString(): 'Assigned',
        },
        {id:'assignee',
            numeric: false,
            disablePadding: true,
            label: 'Assigned By',
        },
        {id:'comments',
            numeric: false,
            disablePadding: true,
            label: 'Comments',
        }

    ];

    return(
        <div>
            {showError && <Alert />}
            <Dialog open={isOpen} onClose={onClose}
                    sx={{
                        "& .MuiDialog-container": {
                            "& .MuiPaper-root": {
                                width: "100%",
                                maxWidth: "1000px",  // Set your width here
                            },
                        },
                    }}>
                <DialogTitle style={{
                    color: "whitesmoke", backgroundColor:"#cf5419", display: "flex",
                    justifyContent: "space-between", alignItems: "center"
                }}>
                    <Typography sx={{fontSize: "1.2rem"}}> Product Audit</Typography>
                    <CloseRounded onClick={onClose} sx={{paddingTop: "5px", fontSize: "2rem"}}/>
                </DialogTitle>
                <DialogContent>
                    <CustomMUITable
                        data={tableData}
                        defaultSort={'assignedStartDate'}
                        columns={columns}
                        title={"Product Assignment Audit"}
                        customRowsPerPage={[5,10]}
                        rowSelectCheckBox={false}
                        useDensePadding={true}
                        tableWidth={900}
                        disableTitle={true}
                        isLoading={loading}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default ProductAuditDialog;
