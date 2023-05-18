import { configureStore } from '@reduxjs/toolkit'
import { articlesReducer } from 'redux/articles/articlesSlice';
import { authReducer } from 'redux/auth/authSlice';
import { usersReducer } from 'redux/users/usersSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        articles: articlesReducer,
        users: usersReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;