import moment from "moment";
import { Box, Typography } from '@mui/material';
import { ArticleItem } from "redux/articles/type";

type Props = {
    currentArticle: ArticleItem
}

const ArticleDetailBasis: React.FC<Props> = ({ currentArticle }: Props) => {
    return (
        <Box>
            {
                Object.keys(currentArticle).length > 0
                &&
                <Box mb={2}>
                    <Typography variant="h4">{currentArticle.title}</Typography>
                    <Box mt={1}>
                        <Typography variant="caption">Created: {moment(currentArticle.created).format('MMMM Do YYYY, h:mm:ss a')}</Typography>
                    </Box>
                    <Box mt={1}>
                        <Typography variant="caption">Updated: {moment(currentArticle.updated).format('MMMM Do YYYY, h:mm:ss a')}</Typography>
                    </Box>
                    {currentArticle.tagList.length > 0 && (
                        <Box mt={1}>
                            <Typography variant="caption">Tags: {currentArticle.tagList.join(', ')}</Typography>
                        </Box>
                    )}
                    <Box mt={1}>
                        <Typography variant="caption">Favorites: {currentArticle.favoriteCount}</Typography>
                    </Box>
                    <Typography variant="subtitle1">{currentArticle.description}</Typography>
                    <Typography variant="body1" dangerouslySetInnerHTML={{ __html: currentArticle.body }}></Typography>
                </Box>
            }
        </Box>
    )
}

export default ArticleDetailBasis;