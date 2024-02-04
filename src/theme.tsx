// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#2196f3',
        },
        secondary: {
            main: '#ff4081',
        },
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    color: 'white',
                    backgroundColor: 'black',
                    borderRadius: '8px',

                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: 'white',
                }
            }
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    color: 'white',
                }
            }
        }
    },
});

export default theme;
