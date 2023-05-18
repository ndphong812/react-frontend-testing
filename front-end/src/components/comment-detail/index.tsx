import React from 'react';
import moment from 'moment';
import { IComment } from 'redux/articles/type';
import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';

type CommentDetailProps = {
    comment: IComment;
};

const CommentDetail: React.FC<CommentDetailProps> = ({ comment }) => {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box my={2}>
            <Button variant="contained" onClick={handleClickOpen}>
                Detail
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Comment Detail</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        The detail information of the comment
                    </DialogContentText>
                    <Typography variant="h4">{comment.author.username}</Typography>
                    <Box mt={1}>
                        <Typography variant="caption">Email: {comment.author.email}</Typography>
                    </Box>
                    <Box mt={1}>
                        <Typography variant="caption">Bio: {comment.author.bio}</Typography>
                    </Box>
                    <Box mt={1}>
                        <Avatar alt="Avatar" src={comment.author.image} />
                    </Box>
                    <Box mt={1}>
                        <Typography variant="caption">Comment ID: {comment.id}</Typography>
                    </Box>
                    <Box mt={1}>
                        <Typography variant="caption">Created: {moment(comment.created).format('MMMM Do YYYY, h:mm:ss a')}</Typography>
                    </Box>
                    <Typography variant="body1">{comment.body}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>

        </Box>
    );
};

export default CommentDetail;