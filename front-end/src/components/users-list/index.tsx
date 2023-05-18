import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useAppSelector } from "app/hook";
import UserItem from "components/user-item";
import { usersState } from "redux/users/usersSlice";

const UserList = () => {

    const selector = useAppSelector(usersState);

    const users = selector.users;

    return (
        <Box>
            <Typography variant="h4">List Users: </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Bio</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user, index) => <UserItem user={user} key={index} />)}
                    </TableBody>
                </Table>
            </TableContainer >
        </Box>
    )
}

export default UserList;