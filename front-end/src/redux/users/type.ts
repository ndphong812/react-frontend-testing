import { User } from "redux/auth/type";

export type UserResponse = {
    users: User[],
    userProfile: User,
}

export type UpdateUserForm = {
    username: string,
    email: string,
    bio: string,
    image: string,
}