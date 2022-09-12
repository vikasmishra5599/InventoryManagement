import RoundCloseIcon from '@mui/icons-material/Close';
import { closeSnackbar } from '../redux/action';
import {IconButton} from "@mui/material";

export function enqueueAPPSnackbar(message, variant) {
    return({
        message,
        options: {
            variant: variant,
            autoHideDuration:3000,
            key: new Date().getTime() + Math.random(),
            action: (key) => (
                <IconButton onClick={() => closeSnackbar(key)}>
                    <RoundCloseIcon style={{color:"white"}} />
                </IconButton>
            ),
        },
    });
}
