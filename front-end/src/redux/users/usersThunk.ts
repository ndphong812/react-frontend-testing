import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "redux/api";

export const getAllUsers = createAsyncThunk(
    "users/get-all-users",
    async () => {
        try {
            const response = await axiosInstance.get('/users');
            return response.data;
        }
        catch (error: any) {
            throw error.response.data;
        }
    }
);

export const getUserInfor = createAsyncThunk(
    "users/get-user-infor",
    async () => {
        try {
            const response = await axiosInstance.get('/user');
            return response.data;
        }
        catch (error: any) {
            throw error.response.data;
        }
    }
);

export const deleteUserByEmail = createAsyncThunk(
    "users/delete-by-email",
    async (email: string) => {
        try {
            const response = await axiosInstance.delete(`/users/${email}`);
            return response.data;
        }
        catch (error: any) {
            throw error.response.data;
        }
    }
);

export const getProfileUserByUsername = createAsyncThunk(
    "users/get-profile",
    async (username: string) => {
        try {
            const response = await axiosInstance.get(`/profiles/${username}`);
            return response.data;
        }
        catch (error: any) {
            throw error.response.data;
        }
    }
);