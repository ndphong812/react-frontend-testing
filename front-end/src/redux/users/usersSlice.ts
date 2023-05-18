import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store';
import { SwalAlert } from 'utils/sweet-alter';
import { deleteUserByEmail, getAllUsers, getProfileUserByUsername } from './usersThunk';
import { UserResponse } from './type';
import { User } from 'redux/auth/type';

const initialState: UserResponse = {
    users: [] as User[],
    userProfile: {} as User,
}

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.users = action.payload;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                SwalAlert("Failed", action.error.message as string, "error");
            })
        builder
            .addCase(deleteUserByEmail.rejected, (state, action) => {
                SwalAlert("Failed", action.error.message as string, "error");
            })
        builder
            .addCase(getProfileUserByUsername.fulfilled, (state, action) => {
                state.userProfile = action.payload.profile;
            })
            .addCase(getProfileUserByUsername.rejected, (state, action) => {
                SwalAlert("Failed", action.error.message as string, "error");
            })
    }
})

export const usersState = (state: RootState) => state.users;
export const usersReducer = usersSlice.reducer;