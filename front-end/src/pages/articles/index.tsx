import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useAppDispatch, useAppSelector } from "app/hook";
import { useEffect } from "react";
import { articlesState } from "redux/articles/articlesSlice";
import { getAllArticles } from "redux/articles/articlesThunk";
import { style } from "./style";
import Article from "components/article";
import NewArticle from "components/new-update-article";

const Articles = () => {
    const dispatch = useAppDispatch();
    const selector = useAppSelector(articlesState);
    const articles = selector.articles;

    const getArticles = async () => {
        await dispatch(getAllArticles());
    };

    useEffect(() => {
        getArticles();
    }, []);


    return (
        <Box>
            <Box sx={style.newButton}>
                <NewArticle title="New Article" />
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Author</TableCell>
                            <TableCell>Created</TableCell>
                            <TableCell>Updated</TableCell>
                            <TableCell>Tags</TableCell>
                            <TableCell>Favorites</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {articles.map((article, index) => <Article article={article} key={index} />)}
                    </TableBody>
                </Table>
            </TableContainer >
        </Box>
    );
};

export default Articles;