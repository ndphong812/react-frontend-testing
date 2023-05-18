
import { createTheme } from '@mui/material/styles';
import { black, blackLight, bold, bolder, greyBold, h1Size, h2Size, h4Size, normal, standFontSize, white } from './variable';
const theme = createTheme({
    palette: {
        primary: {
            main: "#2196f3",
        },
        secondary: {
            main: "#ffffff",
            light: "#333333"
        },
        info: {
            main: "#4caf50"
        },
        error: {
            main: "#d32f2f"
        },
        divider: "#c1c1c1"
    },
    typography: {
        h1:
        {
            color: white,
            fontSize: h1Size
        },
        h2: {
            fontSize: h2Size,
            color: black,
            fontWeight: bold,
            margin: 0
        },
        h4: {
            fontSize: h4Size,
            color: blackLight
        },
        subtitle1:
        {
            fontSize: standFontSize,
            fontWeight: bolder,
            color: greyBold
        },
        subtitle2:
        {
            fontSize: standFontSize,
            fontWeight: bolder,
            color: greyBold
        },
        body1:
        {
            fontSize: standFontSize,
            fontWeight: normal,
            color: greyBold
        },
        body2:
        {
            fontSize: standFontSize,
            fontWeight: bolder,
            color: greyBold
        }
    },
    zIndex: {
        drawer: 1200
    }
});

export default theme;