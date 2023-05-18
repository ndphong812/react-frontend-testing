import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "redux/api";
import { LoginRequest, RegisterRequest } from "./type";
import { UpdateUserForm } from "redux/users/type";

export const registerUser = createAsyncThunk(
    "auth/register",
    async (request: RegisterRequest) => {
        try {
            const response = await axiosInstance.post(`users`,
                request
            );
            return response.data;
        } catch (error: any) {
            throw error.response.data;
        }
    }
);

export const loginUser = createAsyncThunk(
    "auth/login",
    async (request: LoginRequest) => {
        try {
            const response = await axiosInstance.post(`/login`,
                request
            );
            return response.data;
        }
        catch (error: any) {
            throw error.response.data;
        }
    }
);

export const updateInforUser = createAsyncThunk(
    "auth/update-infor",
    async (request: UpdateUserForm) => {
        try {
            const response = await axiosInstance.put(`/user`,
                request
            );
            return response.data;
        }
        catch (error: any) {
            throw error.response.data;
        }
    }
);