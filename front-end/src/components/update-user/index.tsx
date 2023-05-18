import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { SubmitHandler } from "react-hook-form";
import { useEffect, useState } from 'react';
import { User } from 'redux/auth/type';
import { UpdateUserForm } from 'redux/users/type';
import { Box } from '@mui/material';
import ImageUploader from 'components/upload-image';
import { useAppDispatch } from 'app/hook';
import { updateInforUser } from 'redux/auth/authThunk';
import { getAllUsers } from 'redux/users/usersThunk';

const schema = yup.object({
    username: yup.string().required("Username is required!"),
    email: yup.string().required("Email is required!"),
    bio: yup.string().required("Bio is required!")
});

type Props = {
    user: User;
};

const UpdateUser: React.FC<Props> = ({ user }: Props) => {

    const dispatch = useAppDispatch();

    const [image, setImage] = useState('');

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const { register, handleSubmit, reset } = useForm<UpdateUserForm>({
        resolver: yupResolver(schema),
        mode: "all",
        defaultValues: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            image: user.image
        }
    });

    const onSubmit: SubmitHandler<UpdateUserForm> = async (data: UpdateUserForm) => {
        data = {
            ...data,
            image: image
        }
        await dispatch(updateInforUser(data));
        await dispatch(getAllUsers());
        handleClose();
    };

    useEffect(() => {
        reset({
            username: user.username,
            email: user.email,
            bio: user.bio,
            image: user.image
        });
    }, [user, reset]);

    return (
        <Box>
            <Button variant="contained" onClick={handleClickOpen}>
                Update
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Update User Information</DialogTitle>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent>
                        <DialogContentText>
                            Please fill out all the required information for the user.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="username"
                            label="Username"
                            type="text"
                            fullWidth
                            variant="standard"
                            {...register("username")}
                            defaultValue={user.username}
                        />
                        <TextField
                            margin="dense"
                            id="email"
                            label="Email"
                            type="email"
                            fullWidth
                            variant="standard"
                            {...register("email")}
                            defaultValue={user.email}
                        />
                        <TextField
                            margin="dense"
                            id="bio"
                            label="Bio"
                            type="text"
                            fullWidth
                            variant="standard"
                            {...register("bio")}
                            defaultValue={user.bio}
                        />
                        <Box mt={2}>
                            <ImageUploader user={user} setImageLink={setImage} />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Done</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Box>
    );
};

export default UpdateUser;