export interface Problem_structure {
    name : string;
    statement : string;
    input : string;
    output : string;
    example_input : string;
    example_output : string;
    topic_id : number;    
    url_input: string,
    url_output: string,
    url_solution: string;
    difficulty: string;
}

export interface Problem {
    id: number;
    name: string;
    topic: string;
    difficulty: string;
}