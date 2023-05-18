import { Avatar, Box, Button, Grid, TableCell, TableRow, Typography } from "@mui/material"
import { useAppDispatch } from "app/hook"
import NewUpdateArticle from "components/new-update-article"
import moment from "moment"
import { style } from "pages/articles/style"
import { Link } from "react-router-dom"
import { deleteArticle, getAllArticles } from "redux/articles/articlesThunk"
import { ArticleItem, NewEditArticleForm } from "redux/articles/type"

type Props = {
    article: ArticleItem
}
const Article: React.FC<Props> = ({ article }: Props) => {

    const dispatch = useAppDispatch();

    const handleDeleteArticle = async (slug: string) => {
        await dispatch(deleteArticle(slug));
        await dispatch(getAllArticles());
    }
    
    const updateValue: NewEditArticleForm = {
        slug: article.slug,
        title: article.title,
        description: article.description,
        body: article.body,
        tagList: article.tagList.join(' ')
    }

    return (
        <>
            {
                Object.keys(article).length > 0 &&
                <TableRow >
                    <TableCell>{article.id}</TableCell>
                    <TableCell>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item>
                                <Avatar alt={article.author.username} src={article.author.image} />
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1">{article.author.username}</Typography>
                                <Typography variant="body2">{article.author.bio}</Typography>
                            </Grid>
                        </Grid>
                    </TableCell>
                    <TableCell>{moment(article.created).format('MMMM Do YYYY, h:mm:ss a')}</TableCell>
                    <TableCell>{moment(article.updated).format('MMMM Do YYYY, h:mm:ss a')}</TableCell>
                    <TableCell>{article.tagList.join(', ')}</TableCell>
                    <TableCell>{article.favoriteCount}</TableCell>
                    <TableCell>
                        <Box display="flex" flexDirection="row" alignItems="center">
                            <Box sx={style.actionButton}>
                                <NewUpdateArticle title="Update" article={updateValue} />
                            </Box>
                            <Button variant="contained" color="primary" onClick={() => handleDeleteArticle(article.slug)} sx={style.actionButton}>Delete</Button>
                            <Link to={`/articles/${article.slug}`}>Detail</Link>
                        </Box>
                    </TableCell>
                </TableRow>
            }
        </>
    )
}

export default Article;