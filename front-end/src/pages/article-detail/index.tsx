import { useAppDispatch, useAppSelector } from "app/hook";
import { useEffect } from "react";
import { articlesState } from "redux/articles/articlesSlice";
import { createComment, getAllArticleBySlug, getAllComments } from "redux/articles/articlesThunk";
import { useParams } from 'react-router-dom';
import ArticleDetailBasis from "components/article-detail-basis";
import { Box, Button, TextField, Typography } from "@mui/material";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { CommentForm, NewCommentRequest } from "redux/articles/type";
import CommentsTable from "components/comments";

const schema = yup.object({
    comment: yup.string().required("Comment is required!"),
});

const ArticleDetail = () => {

    const { slug } = useParams();
    const dispatch = useAppDispatch();
    const selector = useAppSelector(articlesState);

    const currentArticle = selector.currentArticle;

    const comments =  selector.comments;

    const getComments = async () => {
        await dispatch(getAllComments(slug as string));
    }
    const getArticles = async () => {
        await dispatch(getAllArticleBySlug(slug as string));
    };

    const { register, handleSubmit} = useForm<CommentForm>({
        resolver: yupResolver(schema),
        mode: "all",
    });

    const onSubmit: SubmitHandler<CommentForm> = async (data: CommentForm) => {
        const request: NewCommentRequest = {
            slug: currentArticle.slug,
            body: data.comment
        }
        await dispatch(createComment(request))
        await dispatch(getAllComments(currentArticle.slug));
    };

    useEffect(() => {
        getArticles();
        getComments();
    }, []);

    return (
        <Box>
            <ArticleDetailBasis currentArticle={currentArticle} />
            <Box>
                <Typography variant="h4">Comments</Typography>
                <Box component='form' display="flex" gap={2} onSubmit={handleSubmit(onSubmit)}>
                    <TextField {...register("comment")} id="new-comment" label="New comment" variant="outlined" />
                    <Button type="submit" variant='contained'>Submit</Button>
                </Box>
                {
                    comments && comments.length > 0 &&
                    <Box mt={2}>
                        <CommentsTable comments={comments} />
                    </Box>
                }
            </Box>
        </Box>
    );
};

export default ArticleDetail;