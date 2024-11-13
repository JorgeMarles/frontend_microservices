import { FC } from 'react';
import { Problem } from '../../utils/interfaces';
import ProblemForm from '../../components/Problem';
import { field_problem } from '../../utils/field';
import { create } from '../../fetch/ProblemFetch'

const CreateProblem: FC = () => {

  const handleCreateProblem = async (problem: Problem) => {
    problem.url_input = "";
    problem.url_output = "";
    problem.url_solution = "";
    create(problem);
  }

  return (
    <div className='bg-gray-300 w-screen'>
      <ProblemForm<Problem>
        fields={field_problem}
        onSubmit={handleCreateProblem}
      />
    </div>
  );
};

export default CreateProblem;
