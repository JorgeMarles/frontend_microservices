interface FieldConfig {
    name: string;
    type: string;
}

interface Fields {
    [key: string]: FieldConfig;
}

export const fields_register: Fields = { 
    email: {
        name: "Email",
        type: "email"
    },
    nickname: {
        name: "Nickname",
        type: "text"
    },
    name: {
        name: "Name",
        type: "text"
    },
    password: {
        name: "Password",
        type: "password"
    },
    repeat_password: {
        name: "Repeat password",
        type: "password"
    }
}


export const fields_login: Fields = { 
    email: {
        name: "Email",
        type: "email"
    },
    password: {
        name: "Password",
        type: "password"
    }
}

export const fields_update_password: Fields = { 
    email: {
        name: "Email",
        type: "email"
    },
    verification_code: {
        name: "Verification code",
        type: "text"
    },
    password: {
        name: "Password",
        type: "password"
    },
    repeat_password: {
        name: "Repeat password",
        type: "password"
    }
}