export interface Contest {
  id?: number;
  name: string;
  description: string;
  start: Date;
  difficulty: number;
  duration: number;
  enroll: boolean;
}

export interface ContestDetails extends Contest {
  problems: {
    id: number;
    name: string;
    order?: number;
  }[];
}

export interface ContestRanking {
  user: {
    id: number;
    nickname: string;
  };
  problems_solved: number;
  penalty: number;
  submissions: {
    id: number;
    attemps: number;
    solved: boolean;
    time: number;
    asignation: {
      id: number;
      order: number;
    };
  }[];
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

export interface ContestPosition {
  id: number;
  percentile: number;
  position: number;
}

export interface StatsContest {
  total_contests: number;
  ranking: {
    id: number;
    position: number;
    percentile: number;
  }[];
}

export interface StatsContest {
  total_contests: number;
  ranking: {
    id: number;
    position: number;
    percentile: number;
  }[];
}

export interface StatsProblems {
  veredicts: { name: string; total: number }[];
  total_problems: number;
  total_solved: number;
  average_attempts: number;
  topics: { id: number; name: string; solved: number }[];
}
