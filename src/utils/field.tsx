import React from 'react';
import { AtSymbolIcon } from '@heroicons/react/24/solid';
import { LockClosedIcon, CommandLineIcon, LightBulbIcon, UserCircleIcon, EyeIcon } from '@heroicons/react/24/outline';

const icons = {
    email: <AtSymbolIcon className="h-5 w-5 text-black " />,
    password: <LockClosedIcon className="h-5 w-5 text-black " />,
    nickname: <UserCircleIcon className="h-5 w-5 text-black " />,
    name: <LightBulbIcon className="h-5 w-5 text-black " />,
    verification_code: <CommandLineIcon className="h-5 w-5 text-black " />,
    view: <EyeIcon className="h-7 w-7 text-blue-800 " />
  };

interface FieldConfig {
    name: string;
    type: string;
    icon: React.ReactNode;
}

export interface Fields {
    [key: string]: FieldConfig;
}

export const fields_register: Fields = { 
    email: {
        name: "Email",
        type: "email",
        icon: icons.email
    },
    nickname: {
        name: "Nickname",
        type: "text",
        icon: icons.nickname
    },
    name: {
        name: "Name",
        type: "text",
        icon: icons.name
    },
    password: {
        name: "Password",
        type: "password",
        icon: icons.password
    },
    repeat_password: {
        name: "Repeat password",
        type: "password",
        icon: icons.password
    }
}


export const fields_login: Fields = { 
    email: {
        name: "Email",
        type: "email",
        icon: icons.email
    },
    password: {
        name: "Password",
        type: "password",
        icon: icons.password
    }
}

export const fields_update_password: Fields = { 
    email: {
        name: "Email",
        type: "email",
        icon: icons.email
    },
    verification_code: {
        name: "Verification code",
        type: "text",
        icon: icons.verification_code
    },
    password: {
        name: "Password",
        type: "password",
        icon: icons.password
    },
    repeat_password: {
        name: "Repeat password",
        type: "password",
        icon: icons.password
    }
}

export const field_problem: Fields = {
    statement: {
        name: "Statement",
        type: "text",
        icon: icons.view
    },
    input: {
        name: "Input",
        type: "text",
        icon: icons.view
    },
    output: {
        name: "Output",
        type: "text",
        icon: icons.view
    },
    example_input: {
        name: "example_input",
        type: "text",
        icon: icons.view
    },
    example_output: {
        name: "example_output",
        type: "text",
        icon: icons.view
    }
}