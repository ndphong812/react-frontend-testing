export type AuthRequest = {
    email: string;
    password: string;
}

export type AuthResponse = {
    currentUser: User,
    isLoggedIn: boolean,
    userInfor: User
}

export type LoginRequest = {
    email: string,
    password: string
}

export type RegisterForm = {
    username: string,
    password: string,
    email: string,
    confirmPassword: string
}

export type RegisterRequest = {
    username: string,
    password: string,
    email: string,
}

export type User = {
    bio: string,
    email: string,
    id: number,
    image:string,
    token: string,
    username: string
}