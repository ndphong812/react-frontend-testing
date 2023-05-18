import { User } from "redux/auth/type";
import { Avatar, Box, Button, TableCell, TableRow } from "@mui/material"
import { style } from "pages/articles/style";
import { Link } from "react-router-dom";
import { deleteUserByEmail, getAllUsers } from "redux/users/usersThunk";
import { useAppDispatch } from "app/hook";

type Props = {
    user: User
}

const UserItem: React.FC<Props> = ({ user }: Props) => {

    const dispatch = useAppDispatch();

    const handleDeleteUser = async () => {
        await dispatch(deleteUserByEmail(user.email));
        await dispatch(getAllUsers());
    }

    return (
        <>
            {
                Object.keys(user).length > 0 &&
                <TableRow >
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>
                        <Avatar alt="Image" src={user.image} />
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.bio}</TableCell>
                    <TableCell>
                        <Box display="flex" flexDirection="row" alignItems="center">
                            <Button variant="contained" color="primary"
                                onClick={() => handleDeleteUser()} sx={style.actionButton}
                            >
                                Delete
                            </Button>
                            <Link to={`/user/${user.username}`}>Detail</Link>
                        </Box>
                    </TableCell>
                </TableRow>
            }
        </>
    )
}

export default UserItem;