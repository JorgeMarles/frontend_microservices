import { ContestDetails, Problem, Topic, User } from "./interfaces";

export const contest: ContestDetails = {
  name: "",
  description: "",
  duration: 60,
  start: new Date(),
  enroll: false,
  difficulty: 0,
  problems: [],
};

export const problem: Problem = {
  name: "",
  statement: "",
  input: "",
  output: "",
  example_input: "",
  example_output: "",
  difficulty: "easy",
  topic: {
    id: 0,
    name: "Introductory problems",
    description: "",
  },
  topic_id: 0,
  acceptedSubmissions: 0,
  totalSubmissions: 0,
  submissions: "",
  typeSubmission: "",
};
export const user: User = {
  email: "",
  nickname: "",
  name: "",
  type: false,
  password: "",
};

export const topic: Topic = {
  id: 0,
  name: "Introductory problems",
  description: "",
};
