import { createTheme } from '@mui/material/styles';
import QuickSand from '../Assets/Fonts/QuickSand.woff2';
import Raleway from '../Assets/Fonts/Raleway.woff2';

export const theme = createTheme({

    typography: {
        fontFamily: 'Raleway, Arial',
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: `
        @font-face {
          font-family: 'Raleway';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('Raleway'),local('Raleway-Regular'), url(${Raleway}) format('woff2');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `,
        }
    },
    palette: {
        type: 'light',
        primary: {
            main: '#191fd2',
            dark: '#121193',
        },
        secondary: {
            main: '#6c00dc',
        },
        background: {
            default: '#fff',
            paper: '#fff',
        },
        error: {
            main: '#f5291c',
        },
        success: {
            main: '#06a40a',
        },
    },

    spacing: 8,
    shape: {
        borderRadius: 4,
    },
    overrides: {
        MuiAppBar: {
            colorInherit: {
                backgroundColor: '#689f38',
                color: '#fff',
            },
        },
    },
    props: {
        MuiAppBar: {
            color: 'inherit',
        },
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
            size: 'small',
        },
    },
});
