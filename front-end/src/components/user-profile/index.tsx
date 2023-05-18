import { Avatar, Box, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "app/hook";
import { usersState } from "redux/users/usersSlice";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { style } from "components/user-infor/style";
import { getProfileUserByUsername } from "redux/users/usersThunk";

const UserProfile = () => {

    const selector = useAppSelector(usersState);

    const { username } = useParams();

    const dispatch = useAppDispatch();

    const userProfile = selector.userProfile;

    useEffect(() => {
        if (username) {
            (async () => {
                await dispatch(getProfileUserByUsername(username));
            })()
        }
    }, [])

    return (
        <Box>
            {
                Object.keys(userProfile).length > 0 &&
                <Box sx={style.user}>
                    <Typography variant="h4">User information</Typography>
                    <Avatar alt="Avatar" src={userProfile.image} />
                    <Typography variant="h6">{userProfile.username}</Typography>
                    <Typography variant="body1">{userProfile.bio}</Typography>
                    <Typography variant="body2">{userProfile.email}</Typography>
                </Box>
            }
        </Box>
    )
}

export default UserProfile;