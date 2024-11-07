import React, { FC } from 'react';
import { Problem_structure } from '../../utils/problem_structure';
import Problem from '../../components/Problem';
import { field_problem } from '../../utils/field';
import topics from '../../data/topics.json';
import axios from 'axios';

const CreateProblem: FC = () => {

  const handleCreateProblem = async (problem: Problem_structure) => {
    console.log(problem);
    try {
      const response = await axios.post("http://localhost:8080/problem", problem);
    }
    catch (error) {
      console.error("Error submitting data:", error);
    }
  }


  return (
    <div className='bg-gray-300 w-screen'>
      <Problem<Problem_structure>
        fields={field_problem}
        onSubmit={handleCreateProblem}
        topics={topics}
      />
    </div>
  );
};

export default CreateProblem;
