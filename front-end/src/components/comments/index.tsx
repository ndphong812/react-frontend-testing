import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import CommentItem from "components/comment";
import { IComment } from "redux/articles/type";

type Props = {
    comments: IComment[]
}

const CommentsTable: React.FC<Props> = ({comments}: Props) => {
    return (
        <Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Username Author</TableCell>
                            <TableCell>Content</TableCell>
                            <TableCell>Time</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {comments.map((comment, index) => <CommentItem comment={comment} key={index} />)}
                    </TableBody>
                </Table>
            </TableContainer >
        </Box>
    )
}

export default CommentsTable;