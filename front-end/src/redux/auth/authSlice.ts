import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store';
import { User, AuthResponse } from './type';
import { loginUser, registerUser, updateInforUser } from './authThunk';
import { SwalAlert } from 'utils/sweet-alter';
import { getUserInfor } from 'redux/users/usersThunk';

const initialState: AuthResponse = {
    currentUser: {} as User,
    isLoggedIn: false,
    userInfor: {} as User
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('token');
            state.isLoggedIn = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.currentUser = action.payload.user;
                localStorage.setItem("token", action.payload.user.token);
            })
            .addCase(loginUser.rejected, (state, action) => {
                SwalAlert("Failed", action.error.message as string, "error");
            })
        builder
            .addCase(registerUser.fulfilled, (state, action) => {
                state.currentUser = action.payload.user;
                SwalAlert("Success", "Register successfully", "success");
            })
            .addCase(registerUser.rejected, (state, action) => {
                SwalAlert("Failed", action.error.message as string, "error");
            })
        builder
            .addCase(getUserInfor.fulfilled, (state, action) => {
                state.userInfor = action.payload.user;
                state.isLoggedIn = true;
            })
            .addCase(getUserInfor.rejected, (state, action) => {
                SwalAlert("Failed", action.error.message as string, "error");
            })
        builder
            .addCase(updateInforUser.fulfilled, (state, action) => {
                state.userInfor = action.payload;
            })
            .addCase(updateInforUser.rejected, (state, action) => {
                SwalAlert("Failed", action.error.message as string, "error");
            })
    }
})

export const { logout } = authSlice.actions
export const authState = (state: RootState) => state.auth;
export const authReducer = authSlice.reducer;