import React, {useEffect, useState} from "react";
import CustomizedTables from "./table/customizedTables";
import axios from "axios";
import Alert from "../common/Alert";
import {CircularProgress} from "@mui/material";

const Dashboard = () => {
    const [tableData, setTableData] = useState();
    const [showError, setShowError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchListData();
    }, [])


    const fetchListData = async  () => {
        setLoading(true);
        setShowError(false);

        await axios.get("/ims/dashboard/",
            {headers: {'Accept-Type': 'application/json'}})
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

    return <>
        {showError && <Alert />}
        {loading && <CircularProgress />}
        <CustomizedTables rows={tableData}/>
    </>
}
export default Dashboard;