import React, { FC, useEffect, useState } from 'react';
import { Problem_structure } from '../../utils/problem_structure';
import Problem from '../../components/Problem';
import { field_problem } from '../../utils/field';
import { create } from '../../fetch/ProblemFetch'
import { getTopics } from '../../fetch/TopicFetch';

interface Topic {
  id: number; 
  name: string;
  statement: string;
}

const CreateProblem: FC = () => {

  const handleCreateProblem = async (problem: Problem_structure) => {
    console.log(problem);
    create(problem); 
  }

  const [topics, setTopics] = useState<{id: number, name: string}[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchTopics : Topic[] = await getTopics();
      const topicsArray : {id: number, name: string}[] = fetchTopics.map(({ statement, ...rest }) => rest);
      setTopics(topicsArray);
    }
    fetchData();
  }, []);
  
  return (
    <div className='bg-gray-300 w-screen'>
      <Problem<Problem_structure>
        fields={field_problem}
        onSubmit={handleCreateProblem}
        topics={ topics }
      />
    </div>
  );
};

export default CreateProblem;
