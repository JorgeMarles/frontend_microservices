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