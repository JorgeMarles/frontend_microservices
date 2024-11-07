import React, { FC } from 'react';
import { Problem_structure } from '../../utils/problem_structure';
import Problem from '../../components/Problem';
import { field_problem } from '../../utils/field';
import topics from '../../data/topics.json';

const CreateProblem: FC = () => {

  const handleCreateProblem = (problem: Problem_structure) => {
    console.log(problem);
    
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
