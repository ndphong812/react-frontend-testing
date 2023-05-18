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
import { NewEditArticleForm } from 'redux/articles/type';
import { getAllArticles, postArticle, updateArticle } from 'redux/articles/articlesThunk';
import { useEffect } from 'react';
import { Box } from '@mui/material';

const schema = yup.object({
    title: yup.string().required("Title is required!"),
    description: yup.string().required("Description is required!"),
    body: yup.string().required("Content is required!"),
});

type Props = {
    title: string;
    article?: NewEditArticleForm;
};

const NewUpdateArticle: React.FC<Props> = ({ title, article }: Props) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const dispatch = useAppDispatch();
    const { register, handleSubmit, reset } = useForm<NewEditArticleForm>({
        resolver: yupResolver(schema),
        mode: "all",
        defaultValues: article
    });

    const onSubmit: SubmitHandler<NewEditArticleForm> = async (data: NewEditArticleForm) => {
        if (article && Object.keys(article).length) {
            const postData = {
                slug: article.slug,
                ...data,
                tagList: data.tagList.split(',').map((tag: string) => tag.trim())
            };
            await dispatch(updateArticle(postData));
            await dispatch(getAllArticles());

        }
        else {
            const postData = {
                ...data,
                tagList: data.tagList.split(',').map((tag: string) => tag.trim())
            };
            await dispatch(postArticle(postData));
            await dispatch(getAllArticles());
        }
        handleClose();
    };

    useEffect(() => {
        reset(article);
    }, [article, reset]);

    return (
        <Box>
            <Button variant="contained" onClick={handleClickOpen}>
                {title}
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{title}</DialogTitle>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent>
                        <DialogContentText>
                            Please fill out all the required information for the article.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="title"
                            label="Title"
                            type="text"
                            fullWidth
                            variant="standard"
                            {...register("title")}
                            defaultValue={article?.title || ''}
                        />
                        <TextField
                            margin="dense"
                            id="description"
                            label="Description"
                            type="text"
                            fullWidth
                            variant="standard"
                            {...register("description")}
                            defaultValue={article?.description || ''}
                        />
                        <TextField
                            margin="dense"
                            id="body"
                            label="Body"
                            type="text"
                            fullWidth
                            variant="standard"
                            {...register("body")}
                            defaultValue={article?.body || ''}
                        />
                        <TextField
                            margin="dense"
                            id="tags"
                            label="Tags (separated by comma)"
                            type="text"
                            fullWidth
                            variant="standard"
                            {...register("tagList")}
                            defaultValue={article?.tagList || ''}
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

export default NewUpdateArticle;