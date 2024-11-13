import { FC, useEffect, useState } from 'react';
import { Problem, Topic } from '../../utils/interfaces';
import ProblemForm from '../../components/Problem';
import { field_problem } from '../../utils/field';
import { create } from '../../fetch/ProblemFetch'
import { getTopics } from '../../fetch/TopicFetch';

const CreateProblem: FC = () => {

  const handleCreateProblem = async (problem: Problem) => {
    console.log(problem);
    problem.url_input = "";
    problem.url_output = "";
    problem.url_solution = "";
    problem.difficulty = "easy";
    create(problem); 
  }

  const [topics, setTopics] = useState<{id: number, name: string}[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchTopics : Topic[] = await getTopics().topics;
      const topicsArray : {id: number, name: string}[] = fetchTopics.topics.map(({ statement, ...rest }) => rest);
      setTopics(topicsArray);
    }
    fetchData();
  }, []);
  
  return (
    <div className='bg-gray-300 w-screen'>
      <ProblemForm<Problem>
        fields={field_problem}
        onSubmit={handleCreateProblem}
        topics={ topics }
      />
    </div>
  );
};

export default CreateProblem;
