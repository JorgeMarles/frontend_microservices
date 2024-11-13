export interface Topic {
    id: number,
    name: string,
    description: string
};

export interface Problem {
    name : string;
    statement : string;
    input : string;
    output : string;
    example_input : string;
    example_output : string;    
    url_input: string,
    url_output: string,
    url_solution: string;
    difficulty: string;
    topic : Topic;
};

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