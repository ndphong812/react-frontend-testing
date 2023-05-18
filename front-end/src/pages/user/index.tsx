import { Box } from "@mui/material";
import { useAppDispatch } from "app/hook";
import UserInfor from "components/user-infor";
import UserList from "components/users-list";
import { useEffect } from "react";
import { getAllUsers, getUserInfor } from "redux/users/usersThunk";

const User = () => {

    const dispatch = useAppDispatch();

    const getUsers = async () => {
        const token = localStorage.getItem('token');

        // Actually, we should check whether the token is valid, but in the test, I ignored it.
        if (token) {
            await dispatch(getUserInfor())
            await dispatch(getAllUsers());
        }
    }

    useEffect(() => {
        getUsers();
    }, [])

    return (
        <Box>
            <UserInfor />
            <UserList />
        </Box>
    )
}

export default User;