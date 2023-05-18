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
import { useAppDispatch } from 'app/hook';
import { useEffect } from 'react';
import { Box } from '@mui/material';
import { ArticleItem, CommentForm, DeleteCommentRequest, IComment, NewCommentRequest } from 'redux/articles/type';
import { createComment, deleteCommentBySlugAndId, getAllComments } from 'redux/articles/articlesThunk';

const schema = yup.object({
    comment: yup.string().required("Comment is required!"),
});

type Props = {
    comment: IComment,
    currentArticle: ArticleItem
};

const UpdateComment: React.FC<Props> = ({ comment, currentArticle }: Props) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const dispatch = useAppDispatch();
    const { register, handleSubmit, reset } = useForm<CommentForm>({
        resolver: yupResolver(schema),
        mode: "all",
        defaultValues: {
            comment: comment.body
        }
    });

    const onSubmit: SubmitHandler<CommentForm> = async (data: CommentForm) => {
        
        // In Swagger, there is not PUT method for updating comment, 
        // so I deleted the current comment then used the POST method instead.
        const deleteRequest: DeleteCommentRequest = {
            slug: currentArticle.slug,
            id: comment.id
        }

        const createRequest: NewCommentRequest = {
            slug: currentArticle.slug,
            body: data.comment
        }

        await dispatch(deleteCommentBySlugAndId(deleteRequest));
        await dispatch(createComment(createRequest));
        await dispatch(getAllComments(currentArticle.slug));
        handleClose();
    };

    useEffect(() => {
        reset({
            comment: comment.body
        });
    }, [comment, reset]);

    return (
        <Box>
            <Button variant="contained" onClick={handleClickOpen}>
                Update
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Update Comment</DialogTitle>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent>
                        <DialogContentText>
                            Please fill out all the required information for the comment.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="username"
                            label="Username"
                            type="text"
                            fullWidth
                            variant="standard"
                            {...register("comment")}
                            defaultValue={comment.body}
                        />
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

export default UpdateComment;