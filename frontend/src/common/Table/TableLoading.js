import {Box, CircularProgress} from "@mui/material";


function TableLoading(props){
    const {
        renderLoading
    } = props;
    return(
        renderLoading && <Box sx={{ display: 'flex' }}>
            <CircularProgress />
        </Box>
    )

}

export default TableLoading;
