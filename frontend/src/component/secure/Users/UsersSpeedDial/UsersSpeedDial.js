import * as React from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RefreshIcon from '@mui/icons-material/Refresh';
import {connect} from "react-redux";
import {SpeedDial, SpeedDialAction, SpeedDialIcon} from "@mui/material";
import Box from "@mui/material/Box";
import {getAllAuthUser, setAddEditUserDialogOpen} from "../../../../redux/action";

function DevicesSpeedDial(props) {

    const{
        setAddEditUserDialogOpen,
        getAllAuthUser,
    }= props;

    const handleSetAddDeviceDialogOpen=()=>{
        setAddEditUserDialogOpen(true, false , undefined);
    }

    const handleGetAllDevices=()=>{
        getAllAuthUser();
    }

    const actions = [
        { icon: <AddCircleIcon onClick={handleSetAddDeviceDialogOpen}/>, name: 'Register User' },
        { icon: <RefreshIcon onClick={handleGetAllDevices}/> ,name:'Refresh'},
    ];

    return (
        <Box sx={{ position: 'relative', mt: 3, height: 30 }}>
            <SpeedDial
                ariaLabel="devices speedDial"
                sx={{ position: 'absolute', top: -2, right: -15 }}
                icon={<SpeedDialIcon sx={{width: 25, height: 25}}/>}
                direction={"down"}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                    />
                ))}
            </SpeedDial>
        </Box>
    );
}

const mapDispatchToProps={
    getAllAuthUser,
    setAddEditUserDialogOpen,
}

export default connect(null,mapDispatchToProps)(DevicesSpeedDial);
