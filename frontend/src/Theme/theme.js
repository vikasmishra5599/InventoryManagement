import {createTheme} from '@mui/material/styles';
import QuickSand from '../Assets/Fonts/QuickSand.woff2';
import Raleway from '../Assets/Fonts/Raleway.woff2';
import KFOmCnqEu92Fr1Mu72xKKTU1Kvnz from '../Assets/Fonts/KFOmCnqEu92Fr1Mu72xKKTU1Kvnz.woff2';
import KFOmCnqEu92Fr1Mu5mxKKTU1Kvnz from '../Assets/Fonts/KFOmCnqEu92Fr1Mu5mxKKTU1Kvnz.woff2';
import KFOmCnqEu92Fr1Mu7mxKKTU1Kvnz from '../Assets/Fonts/KFOmCnqEu92Fr1Mu7mxKKTU1Kvnz.woff2';
import KFOmCnqEu92Fr1Mu4WxKKTU1Kvnz from '../Assets/Fonts/KFOmCnqEu92Fr1Mu4WxKKTU1Kvnz.woff2';
import KFOmCnqEu92Fr1Mu7GxKKTU1Kvnz from '../Assets/Fonts/KFOmCnqEu92Fr1Mu7GxKKTU1Kvnz.woff2';
import KFOmCnqEu92Fr1Mu4mxKKTU1Kg from '../Assets/Fonts/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2';
import KFOmCnqEu92Fr1Mu7WxKKTU1Kvnz from '../Assets/Fonts/KFOmCnqEu92Fr1Mu7WxKKTU1Kvnz.woff2'


export const theme = createTheme({
    typography: {
        fontFamily: 'Roboto, sans-serif',
    }, components: {
        MuiCssBaseline: {
            styleOverrides: `
        @font-face {
          font-family: 'Raleway';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('Raleway'),local('Raleway-Regular'), url(/ims${Raleway}) format('woff2');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        },
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  src: url(/ims${KFOmCnqEu92Fr1Mu72xKKTU1Kvnz}) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
},
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  src: url(/ims${KFOmCnqEu92Fr1Mu5mxKKTU1Kvnz}) format('woff2');
  unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
},
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  src: url(/ims${KFOmCnqEu92Fr1Mu7mxKKTU1Kvnz}) format('woff2');
  unicode-range: U+1F00-1FFF;
},
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  src: url(/ims${KFOmCnqEu92Fr1Mu4WxKKTU1Kvnz}) format('woff2');
  unicode-range: U+0370-03FF;
},
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  src: url(/ims${KFOmCnqEu92Fr1Mu7WxKKTU1Kvnz}) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
},
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  src: url(/ims${KFOmCnqEu92Fr1Mu7GxKKTU1Kvnz}) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
},

@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  src: url(/ims${KFOmCnqEu92Fr1Mu4mxKKTU1Kg}) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
      `,
        }
    }, palette: {
        type: 'light', primary: {
            main: '#e85814',
        }, secondary: {
            main: '#1654ea',
        }, success: {
            main: '#45d64a',
        }, error: {
            main: '#ef020f',
        }, info: {
            main: '#0b88f3',
        }, unSecure: {
            main: '#0d7e16', contrastText: '#fff'
        },
    },

    spacing: 8, shape: {
        borderRadius: 4,
    }, overrides: {
        MuiAppBar: {
            colorInherit: {
                backgroundColor: '#e85814', color: '#fff',
            },
        },
    }, props: {
        MuiAppBar: {
            color: 'inherit',
        }, MuiButton: {
            size: 'small',
        }, MuiButtonGroup: {
            size: 'small',
        }, MuiCheckbox: {
            size: 'small',
        }, MuiFab: {
            size: 'small',
        }, MuiFormControl: {
            margin: 'dense', size: 'small',
        }, MuiFormHelperText: {
            margin: 'dense',
        }, MuiIconButton: {
            size: 'small',
        }, MuiInputBase: {
            margin: 'dense',
        }, MuiInputLabel: {
            margin: 'dense',
        }, MuiRadio: {
            size: 'small',
        }, MuiSwitch: {
            size: 'small',
        }, MuiTextField: {
            margin: 'dense', size: 'small',
        },
    },
});
