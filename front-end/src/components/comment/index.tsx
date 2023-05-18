import { Box, Button, TableCell, TableRow } from "@mui/material";
import { useAppDispatch, useAppSelector } from "app/hook";
import CommentDetail from "components/comment-detail";
import UpdateComment from "components/update-comment";
import moment from "moment";
import { style } from "pages/articles/style";
import { articlesState } from "redux/articles/articlesSlice";
import { deleteCommentBySlugAndId, getAllComments } from "redux/articles/articlesThunk";
import { DeleteCommentRequest, IComment } from "redux/articles/type";

type Props = {
    comment: IComment
}

const CommentItem: React.FC<Props> = ({ comment }: Props) => {

    const selector = useAppSelector(articlesState);

    const dispatch = useAppDispatch();

    const currentArticle = selector.currentArticle;

    const handleDeleteComment = async () => {
        const request: DeleteCommentRequest = {
            slug: currentArticle.slug,
            id: comment.id
        }
        await dispatch(deleteCommentBySlugAndId(request))
        await dispatch(getAllComments(currentArticle.slug))
    }
    return (
        <>
            {
                Object.keys(comment).length > 0 &&
                <TableRow >
                    <TableCell>{comment.id}</TableCell>
                    <TableCell>{comment.author.username}</TableCell>
                    <TableCell>{comment.body}</TableCell>
                    <TableCell>{moment(comment.created).format('MMMM Do YYYY, h:mm:ss a')}</TableCell>
                    <TableCell>
                        <Box display="flex" flexDirection="row" alignItems="center">
                            <Box sx={style.actionButton}>
                                <UpdateComment comment={comment} currentArticle={currentArticle} />
                            </Box>
                            <Button variant="contained" color="primary" onClick={() => handleDeleteComment()} sx={style.actionButton}>Delete</Button>
                            <CommentDetail comment={comment} />
                        </Box>
                    </TableCell>
                </TableRow>
            }
        </>
    )
}

export default CommentItem;