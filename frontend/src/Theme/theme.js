import { createTheme } from '@mui/material/styles';

export const Theme = createTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#1f3096',
            contrastText: '#e5e5e5',
        },
        secondary: {
            main: '#0f248d',
        },
    },
    typography: {
        fontFamily: 'Raleway',
        fontWeightLight: 400,
        h1: {
            fontSize: '5.9rem',
        },
        button: {
            fontSize: '1rem',
            fontFamily: 'Raleway',
        },
        overline: {
            fontFamily: 'Raleway',
        },
        fontWeightRegular: 500,
        fontWeightMedium: 600,
    },
    shape: {
        borderRadius: 4,
    },
    props: {
        MuiButton: {
            size: 'small',
        },
        MuiButtonGroup: {
            size: 'small',
        },
        MuiCheckbox: {
            size: 'small',
        },
        MuiFab: {
            size: 'small',
        },
        MuiFormControl: {
            margin: 'dense',
            size: 'small',
        },
        MuiFormHelperText: {
            margin: 'dense',
        },
        MuiIconButton: {
            size: 'small',
        },
        MuiInputBase: {
            margin: 'dense',
        },
        MuiInputLabel: {
            margin: 'dense',
        },
        MuiRadio: {
            size: 'small',
        },
        MuiSwitch: {
            size: 'small',
        },
        MuiTextField: {
            margin: 'dense',
            size: 'medium',
        },
    },
    spacing: 8,
    overrides: {
        MuiSwitch: {
            root: {
                width: 42,
                height: 26,
                padding: 0,
                margin: 8,
            },
            switchBase: {
                padding: 1,
                '&$checked, &$colorPrimary$checked, &$colorSecondary$checked': {
                    transform: 'translateX(16px)',
                    color: '#fff',
                    '& + $track': {
                        opacity: 1,
                        border: 'none',
                    },
                },
            },
            thumb: {
                width: 24,
                height: 24,
            },
            track: {
                borderRadius: 5,
                border: '1px solid #bdbdbd',
                backgroundColor: '#fafafa',
                opacity: 1,
                transition: 'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
            },
        },
    },
});
