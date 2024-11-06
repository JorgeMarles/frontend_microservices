export interface User_login {
    email: string;
    password: string;
}

export interface User_register {
    email: string;
    nickname: string;
    name: string;
    password: string;
    repeat_password: string;
}

export interface User_update_password {
    email: string;
    verification_code: string;
    password: string;
    repeat_password: string;
}