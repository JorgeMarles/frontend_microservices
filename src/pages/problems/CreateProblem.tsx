import { FC, useEffect, useState } from 'react';
import { Problem } from '../../utils/interfaces';
import ProblemForm from '../../components/forms/ProblemForm';
import { field_problem } from '../../utils/field';
import { create, getByID, update } from '../../fetch/ProblemFetch'
import Menu from '../../components/Menu';
import ProblemView from '../../components/ProblemView';
import { problem as defaultProblem } from '../../utils/emptyEntities';
import { useNavigate, useParams } from 'react-router-dom';
import FileCard from '../../components/cards/FileCard';
import { downloadFiles, uploadFiles } from '../../fetch/RunnerFetch';

const CreateProblem: FC = () => {
  const { id } = useParams();
  const [data, setData] = useState<Problem>(defaultProblem);
  const [preview, setPreview] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [input, setInput] = useState<File>();
  const [output, setOutput] = useState<File>();
  const navigate = useNavigate();

  const fileOptions = [
    {
      name: "Input file", type: ".zip",
      handleSubmit: (file: File) => {
        alert(`subiendo ${file.name}`);
        setInput(file);
      }
    },
    {
      name: "Output file", type: ".zip",
      handleSubmit: (file: File) => {
        setOutput(file);
      }
    },
  ];

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        setIsLoading(true);
        const idProblem = id !== undefined ? parseInt(id) : 0;
        const response = await getByID(idProblem);
        const files = await downloadFiles(idProblem);
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
    if (!("id" in problem)) {
      if (!input) {
        alert("Please, select a input file before submit create a problem");
        return;
      }
      if (!output) {
        alert("Please, select a input file before submit create a problem");
        return;
      }
    }
    try {
      let response;
      let id;
      let success:boolean;
      if ("id" in problem) {
        response = await update(problem);
        id = problem.id;
        success = response?.status == 200;
      }
      else {
        response = await create(problem);
        id = response?.data.problem_id;
        success = response?.status == 201;
      }
      console.log(input);
      console.log(output);
      if (success && input && output) {
        const runner = await uploadFiles(input, output, id);
        success = runner?.status == 200;
      }
      if(success) {
        alert("Problem completed.") 
        navigate("/home");
      }
    }
    catch (error) {
      console.error(error);
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

        <div className='flex w-full'>
          <div className="h-full w-1 bg-gray-500 mt-5"></div>
          <div className='w-full p-5'>
            {fileOptions.map((item, index) => {
              return (
                <FileCard
                  name={item.name}
                  onSubmit={item.handleSubmit}
                  type={item.type}
                  key={index}
                  textSubmit="Confirm"
                />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProblem;
