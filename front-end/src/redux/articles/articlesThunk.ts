import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "redux/api";
import { DeleteCommentRequest, NewCommentRequest, NewEditArticleRequest } from "./type";

export const getAllArticles = createAsyncThunk(
    "articles/get-all",
    async () => {
        try {
            const response = await axiosInstance.get(`/articles`);
            return response.data;
        } catch (error: any) {
            throw error.response.data;
        }
    }
);

export const getAllArticleBySlug = createAsyncThunk(
    "articles/get-by-slug",
    async (slug: string) => {
        try {
            const response = await axiosInstance.get(`/articles/${slug}`);
            return response.data;
        } catch (error: any) {
            throw error.response.data;
        }
    }
);

export const deleteArticle = createAsyncThunk(
    "articles/delete-by-slug",
    async (slug: string) => {
        try {
            const response = await axiosInstance.delete(`/articles/${slug}`);
            return response.data;
        } catch (error: any) {
            throw error.response.data;
        }
    }
);


export const postArticle = createAsyncThunk(
    "articles/post",
    async (request: NewEditArticleRequest) => {
        try {
            const response = await axiosInstance.post(`/articles`, request);
            return response.data;
        } catch (error: any) {
            throw error.response.data;
        }
    }
);


export const updateArticle = createAsyncThunk(
    "articles/update",
    async (request: NewEditArticleRequest) => {
        try {
            const { slug, ...validRequest } = request;
            const response = await axiosInstance.put(`/articles/${slug}`, validRequest);
            return response.data;
        } catch (error: any) {
            throw error.response.data;
        }
    }
);


export const getAllComments = createAsyncThunk(
    "articles/get-all-comments",
    async (slug: string) => {
        try {
            const response = await axiosInstance.get(`/articles/${slug}/comments`);
            return response.data;
        } catch (error: any) {
            throw error.response.data;
        }
    }
);

export const createComment = createAsyncThunk(
    "articles/create-comment",
    async (request: NewCommentRequest) => {
        try {
            const response = await axiosInstance.post(`/articles/${request.slug}/comments`, {
                body: request.body
            });
            return response.data;
        } catch (error: any) {
            throw error.response.data;
        }
    }
);

export const deleteCommentBySlugAndId = createAsyncThunk(
    "articles/delete-comment",
    async (request: DeleteCommentRequest) => {
        try {
            const response = await axiosInstance.delete(`/articles/${request.slug}/comments/${request.id}`);
            return response.data;
        } catch (error: any) {
            throw error.response.data;
        }
    }
);