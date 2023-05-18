import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store';
import { createComment, deleteArticle, getAllArticleBySlug, getAllArticles, getAllComments, updateArticle } from './articlesThunk';
import { ArticleItem, IComment } from './type';
import { SwalAlert } from 'utils/sweet-alter';

const initialState = {
    articles: [] as ArticleItem[],
    articlesCount: 0,
    currentArticle: {} as ArticleItem,
    comments: [] as IComment[]
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllArticles.fulfilled, (state, action) => {
                const response = action.payload;
                state.articles = response.articles;
                state.articlesCount = response.articlesCount;
            })

        builder
            .addCase(getAllArticleBySlug.fulfilled, (state, action) => {
                const response = action.payload;
                state.currentArticle = response.article;
            })
        builder
            .addCase(deleteArticle.rejected, (state, action) => {
                SwalAlert("Failed", action.error.message as string, "error");
            })
        builder
            .addCase(updateArticle.rejected, (state, action) => {
                SwalAlert("Failed", action.error.message as string, "error");
            })
        builder
            .addCase(getAllComments.fulfilled, (state, action) => {
                state.comments = action.payload.comments;
            })
            .addCase(getAllComments.rejected, (state, action) => {
                SwalAlert("Failed", action.error.message as string, "error");
            })
        builder
            .addCase(createComment.rejected, (state, action) => {
                SwalAlert("Failed", action.error.message as string, "error");
            })
    }
})

export const articlesState = (state: RootState) => state.articles;
export const articlesReducer = authSlice.reducer;