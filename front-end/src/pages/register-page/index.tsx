import { SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {
    Container, CssBaseline, Box, Typography, TextField, Button
}
    from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import 'react-toastify/dist/ReactToastify.css';
import { RegisterForm, RegisterRequest } from "redux/auth/type";
import { useAppDispatch } from "app/hook";
import { style } from "pages/login-page/style";
import { registerUser } from "redux/auth/authThunk";

const schema = yup.object({
    username: yup.string().required("Username is not empty!"),
    password: yup.string().required("Password is not empty!"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), ""], 'Passwords must match')
});

const RegisterPage = () => {
    const dispatch = useAppDispatch()
    const classes = style()
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>({
        resolver: yupResolver(schema),
        mode: "all"
    });

    const onSubmit: SubmitHandler<RegisterForm> = async (data: RegisterForm) => {
        const postData: RegisterRequest = {
            username: data.username,
            password: data.password,
            email: data.email
        }
        await dispatch(registerUser(postData));
    };
    return (

        <Box>
            <Box className={classes["auth"]} >
                <CssBaseline />
                <Container className={classes["container"]}>
                    <Box>
                        <Typography component="h1" variant="h1" >
                            React Intern Testing
                        </Typography>
                        <Box
                            className={classes["auth-form"]}
                        >
                            <Typography component="h2" variant="body1"
                            >
                                Register
                            </Typography>
                            <Box component="form" onSubmit={handleSubmit(onSubmit)} >
                                <Box className={classes["auth-form__group"]}>
                                    <PersonIcon className={classes["auth-form__group__icon"]} />
                                    <TextField
                                        label="Username"
                                        variant="standard"
                                        required
                                        fullWidth
                                        id="username"
                                        autoFocus
                                        {...register("username")}
                                    />
                                </Box>
                                <Box className={classes["auth-form__group"]}>
                                    <LockIcon className={classes["auth-form__group__icon"]} />
                                    <TextField
                                        variant="standard"
                                        required
                                        fullWidth
                                        label="Password"
                                        type="password"
                                        id="password"
                                        {...register("password")}
                                    />
                                </Box>
                                <Box className={classes["auth-form__group"]}>
                                    <LockIcon className={classes["auth-form__group__icon"]} />
                                    <TextField
                                        variant="standard"
                                        required
                                        fullWidth
                                        label="Confirm Password"
                                        type="password"
                                        id="confirmPassword"
                                        {...register("confirmPassword")}
                                    />
                                </Box>
                                <Box className={classes["auth-form__group"]}>
                                    <LockIcon className={classes["auth-form__group__icon"]} />
                                    <TextField
                                        variant="standard"
                                        required
                                        fullWidth
                                        label="Email"
                                        type="email"
                                        id="email"
                                        {...register("email")}
                                    />
                                </Box>
                                <Box className={classes["auth-form__group"]}>
                                    {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
                                </Box>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    className={classes["auth-form__button"]}
                                    id="register"
                                >
                                    Register
                                </Button>
                                <Box className={classes["auth-form__register"]}>
                                    <Link to="/login">
                                        Go to Log gin
                                    </Link>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </Box >
        </Box>
    );
}

export default RegisterPage;