import { Theme } from "@mui/material/styles";
import { makeStyles, createStyles } from '@mui/styles';
import { loginBg } from "utils/variable";
export const style = makeStyles((theme: Theme) => createStyles({
    "auth": {
        width: "100%",
        height: "100vh",
        backgroundColor: loginBg,
        textAlign: "center"
    },
    "container":
    {
        display: "flex !important",
        flexDirection: "row",
        alignItems: "center",
        height: "100%",
        justifyContent: "center"
    },
    "auth-form":
    {
        display: 'flex',
        flexDirection: 'column',
        padding: "30px 24px",
        maxWidth: "360px",
        margin: "20px auto",
        borderRadius: "6px",
        backgroundColor: theme.palette.secondary.main,
    },
    "auth-form__title":
    {
        fontSize: "20px !important"
    },
    "auth-form__group":
    {
        display: "flex",
        alignItems: "flex-end",
        marginBottom: "40px",
        width: "300px"
    },
    "auth-form__group__icon":
    {
        color: theme.palette.secondary.light,
        marginRight: "10px",
        fontSize: "20px !important",
    },
    "auth-form__button": {
        width: "100%"
    },
    "auth-form__register": {
        marginTop: "10px",
    }
}))