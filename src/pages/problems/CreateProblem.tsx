import { FC, useEffect, useState } from 'react';
import { Problem } from '../../utils/interfaces';
import ProblemForm from '../../components/ProblemForm';
import { field_problem } from '../../utils/field';
import { create, getByID, update } from '../../fetch/ProblemFetch'
import Menu from '../../components/Menu';
import ProblemView from '../../components/ProblemView';
import { problem as defaultProblem } from '../../utils/emptyEntities';
import { useParams } from 'react-router-dom';

const CreateProblem: FC = () => {
  const { id } = useParams();
  const [data, setData] = useState<Problem>(defaultProblem);
  const [preview, setPreview] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        setIsLoading(true);
        const idProblem = id !== undefined ? parseInt(id) : 0;
        const response = await getByID(idProblem);
        setData(response.problem);
      } catch (error) {
        console.error('Error fetching data: ', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id !== undefined) {
      fetchProblem();
    }
  }, [id]);

  const handleCreateProblem = async (problem: Problem) => {
    problem.url_input = "";
    problem.url_output = "";
    problem.url_solution = "";
    if( "id" in problem ) {
      update(problem);
    }
    else {
      create(problem);
    }
  };

  const handleView = (problem: Problem) => {
    setData(problem);
    setPreview(!preview);
  };

  if (isLoading) {
    return (
      <div className='bg-gray-300 w-screen'>
        <Menu />
        Loading...
      </div>
    );
  }

  return (
    <div className='bg-gray-300 w-screen'>
      <Menu />
      <div className='grid grid-cols-3 gap-4'>
        <div className='col-span-2'>
          {!preview && (
            <ProblemForm
              data={data} // Pasa los datos actualizados al formulario
              fields={field_problem}
              onSubmit={handleCreateProblem}
              onView={handleView}
            />
          )}
          {preview && (
            <ProblemView
              data={data} // Pasa los datos actualizados al visor
              fields={field_problem}
              onView={handleView}
            />
          )}
        </div>

        <div className='mx-5 flex'>
          <div className="h-full w-1 bg-gray-500 mt-5"></div>
          <div className='pl-5 ml-5 w-full'>
            <h1 className='font-Jomhuria text-7xl text-center'>
              Problem's files
            </h1>
            <div className='bg-white pb-5 px-8 m-5 rounded-2xl border-2 border-black flex flex-col justify-center h-48'>
              <h1 className='text-center'>Solution.cpp</h1>
              <button className='rounded-full bg-gray-300 m-1 px-5 py-2 text-black hover:text-black hover:bg-gray-500 border border-black '>
                Select file
              </button>
              <button className='rounded-full bg-gray-300 m-1 px-5 py-2 text-black hover:text-black hover:bg-gray-500 border border-black '>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProblem;
