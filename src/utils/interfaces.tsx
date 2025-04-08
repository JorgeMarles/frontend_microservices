export interface Contest {
  id?: number;
  name: string;
  description: string;
  start: Date;
  duration: number;
}

export interface ContestDetails extends Contest {
  problems: {
    id: number;
    name: string;
  }[];
}

export interface ContestRanking {
  user: number;
  problemsSolved: number;
  penalty: number;
  submissions: [
    {
      attempts: number;
      solved: boolean;
      time: number;
    }
  ];
}

export interface Topic {
  id: number;
  name: string;
  description: string;
}

export interface Problem {
  id?: number;
  name: string;
  statement: string;
  input: string;
  output: string;
  example_input: string;
  example_output: string;
  difficulty: string;
  topic: Topic;
  topic_id: number;
  acceptedSubmissions: number;
  totalSubmissions: number;
  submissions: string;
  typeSubmission: string;
}

export interface Submission {
  id: string;
  veredict: string;
  executionDate: Date;
  problemId: number;
  problemName: string;
  code_string: string | undefined;
  public: boolean;
  nicknameUser: string;
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
