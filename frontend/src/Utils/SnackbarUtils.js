import RoundCloseIcon from '@mui/icons-material/Close';
import { closeSnackbar } from '../redux/action';
import Button from "@mui/material/Button";

export function enqueueAPPSnackbar(message, variant) {
    return({
        message,
        options: {
            variant: variant,
            autoHideDuration:3000,
            key: new Date().getTime() + Math.random(),
            action: (key) => (
                <Button onClick={() => closeSnackbar(key)}>
                    <RoundCloseIcon style={{color:"white"}} />
                </Button>
            ),
        },
    });
}
