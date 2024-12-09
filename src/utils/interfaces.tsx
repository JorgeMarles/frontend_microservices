export interface Topic {
    id: number,
    name: string,
    description: string
};

export interface Problem {
    id ?: number;
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
    topic: Topic;
    topic_id: number;
    acceptedSubmissions: number;
    totalSubmissions: number;
    submissions: string;
    typeSubmission: string;
};

export interface Submission {
    id: number;
    time_judge: string;
    time_running: string;
    nickname: string;
    problem: {
        id: number;
        name: string;
    };
    veredict: string;
}

export interface User {
    id?: number;
    email: string;
    nickname: string;
    name: string;
    type: boolean;
    password: string;
    repeatPassword?: string;
    newPassword?: string;
}

export interface UserUpdatePassword {
    email: string;
    code: string;
    password: string;
    repeat_password: string;
}
