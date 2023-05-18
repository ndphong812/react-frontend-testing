import { Avatar, Box, Button, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "app/hook";
import { authState, logout } from "redux/auth/authSlice";
import { style } from "./style";
import { Link, useNavigate } from "react-router-dom";
import UpdateUser from "components/update-user";

const UserInfor = () => {

    const selector = useAppSelector(authState);

    const dispatch = useAppDispatch();

    const userInfor = selector.userInfor;

    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    }

    return (
        <Box>
            {
                Object.keys(userInfor).length > 0 ?
                    <Box sx={style.user}>
                        <Typography variant="h4">Your information</Typography>
                        <Avatar alt="Avatar" src={userInfor.image} />
                        <Typography variant="caption">ID: {userInfor.id}</Typography>
                        <Typography variant="h6">{userInfor.username}</Typography>
                        <Typography variant="body1">{userInfor.bio}</Typography>
                        <Typography variant="body2">{userInfor.email}</Typography>
                        <Button sx={style.user} variant="contained" onClick={() => handleLogout()}>
                            Log out
                        </Button>
                        <Box>
                            <UpdateUser user={userInfor} />
                        </Box>
                    </Box>
                    :
                    <Box sx={style.user}>
                        <Button variant="contained">
                            <Link to="/login">Log in</Link>
                        </Button>
                    </Box>
            }
        </Box>
    )
}

export default UserInfor;