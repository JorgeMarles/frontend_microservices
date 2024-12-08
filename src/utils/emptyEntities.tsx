import { Problem, Topic } from "./interfaces";

export const problem: Problem = {
    name: "",
    statement: "",
    input: "",
    output: "",
    example_input: "",
    example_output: "",
    url_input: "",
    url_output: "",
    url_solution: "",
    difficulty: "easy",
    topic: {
        id: 0,
        name: "Introductory problems",
        description: ""
    },
    topic_id: 0,
    acceptedSubmissions: 0,
    totalSubmissions: 0,
    submissions: "",
    typeSubmission: "",
};

export const topic: Topic = {
    id: 0,
    name: "Introductory problems",
    description: ""
}