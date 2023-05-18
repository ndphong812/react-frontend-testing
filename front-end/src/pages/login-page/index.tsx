import { SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {
    Container, CssBaseline, Box, Typography, TextField, Button
}
    from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import { LoginRequest } from "redux/auth/type";
import { style } from "./style";
import { useAppDispatch, useAppSelector } from "app/hook";
import { loginUser } from "redux/auth/authThunk";
import { authState } from "redux/auth/authSlice";
import { useEffect } from "react";

const schema = yup.object({
    email: yup.string().required("Email is not empty!"),
    password: yup.string().required("Password is not empty!")
}).required();

const LoginPage = () => {
    const selector = useAppSelector(authState);
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const classes = style()
    const { register, handleSubmit } = useForm<LoginRequest>({
        resolver: yupResolver(schema),
        mode: "all"
    });

    const onSubmit: SubmitHandler<LoginRequest> = async (data: LoginRequest) => {
        await dispatch(loginUser(data));
    };

    useEffect(() => {
        const token = localStorage.getItem('token');

        // Actually, we need to check if the token is valid, but in the test, I ignored it.
        if (token) {
            navigate('/');
        }
    }, [selector.isLoggedIn])

    useEffect(() => {
        if (selector.isLoggedIn) {
            navigate('/');
        }
    }, [selector.isLoggedIn])

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
                                Log in
                            </Typography>
                            <Box component="form" onSubmit={handleSubmit(onSubmit)} >
                                <Box className={classes["auth-form__group"]}>
                                    <PersonIcon className={classes["auth-form__group__icon"]} />
                                    <TextField
                                        label="Email"
                                        variant="standard"
                                        required
                                        fullWidth
                                        id="email"
                                        type="email"
                                        autoFocus
                                        {...register("email")}
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
                                <Button
                                    type="submit"
                                    variant="contained"
                                    className={classes["auth-form__button"]}
                                    id="login"
                                >
                                    Log in
                                </Button>
                                <Box className={classes["auth-form__register"]}>
                                    <Link to="/register">
                                        Go to Register
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

export default LoginPage;