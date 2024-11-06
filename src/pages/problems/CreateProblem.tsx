import React, { FC } from 'react';
import { Problem_structure } from '../../utils/problem_structure';
import Problem from '../../components/Problem';
import { field_problem } from '../../utils/field';

const CreateProblem: FC = () => {

  const handleCreateProblem = (problem: Problem_structure) => {
    console.log(problem);
    
  }


  return (
    <div className='flex flex-grow  bg-gray-300'>
      <Problem<Problem_structure>
        fields={field_problem}
        onSubmit={handleCreateProblem}
      />
    </div>
  );
};

export default CreateProblem;
