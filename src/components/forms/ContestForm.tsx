import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { ContestDetails, Problem } from "../../utils/interfaces";
import { createContest, updateContest } from "../../fetch/ContestFetch";
import Search from "../Search";
import { getByName } from "../../fetch/ProblemFetch";
import { TrashIcon } from "@heroicons/react/24/outline";

type action = "CREATE" | "EDIT";

interface Props {
  action?: action;
  data: ContestDetails;
  onSubmit: (data: ContestDetails) => void;
}

export default function ContestForm({
  action = "CREATE",
  data,
  onSubmit,
}: Props) {
  const [formData, setFormData] = useState<ContestDetails>(data);
  const [problems, setProblems] = useState<ContestDetails["problems"]>(
    data.problems
  );

  const [searchProblem, setSearchProblem] = useState<Problem | null>(null);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    if (name === "start") {
      setFormData({
        ...formData,
        start: DateTime.fromFormat(value, "yyyy-MM-dd'T'HH:mm").toJSDate(),
      });

      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  async function handleCreate(contest: ContestDetails) {
    await createContest(contest);
    alert("Contest creado correctamente");
  }

  async function handleEdit(contest: ContestDetails) {
    await updateContest(contest);
    alert("Contest editado correctamente");
  }

  async function handleProblemSearch(query: string) {
    try {
      const results = await getByName(query);

      setSearchProblem(results?.data.problem);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Ha ocurrido un error");
      }
    }
  }

  function handleAddProblem(problem: ContestDetails["problems"][0]) {
    setProblems([...problems, problem]);
  }

  function handleRemoveProblem(problem: ContestDetails["problems"][0]) {
    setProblems(problems.filter((p) => p.id != problem.id));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const transformedData: ContestDetails = {
      ...formData,
      problems,
    };

    try {
      if (action === "CREATE") {
        await handleCreate(transformedData);
      }

      if (action === "EDIT") {
        await handleEdit(transformedData);
      }

      onSubmit(transformedData);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Ha ocurrido un error");
      }
    }
  };

  useEffect(() => {
    setFormData(data);
    setProblems(data.problems);
  }, [data]);

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label htmlFor="name" className="font-Jomhuria text-5xl block">
              Name
            </label>
            <input
              id="name"
              className="p-2 outline-none w-full"
              type="text"
              name="name"
              onChange={handleChange}
              placeholder="Contest's name"
              value={formData.name}
              required
            />
          </div>

          <div className="col-span-2">
            <label
              htmlFor="description"
              className="font-Jomhuria text-5xl block"
            >
              Description
            </label>
            <textarea
              id="description"
              className="p-2 outline-none w-full"
              name="description"
              onChange={handleChange}
              placeholder="Contest's description"
              value={formData.description}
              required
              rows={5}
            />
          </div>

          <div>
            <label htmlFor="start" className="font-Jomhuria text-5xl block">
              Start Time
            </label>
            <input
              id="start"
              className="p-2 outline-none w-full"
              type="datetime-local"
              name="start"
              onChange={handleChange}
              value={DateTime.fromJSDate(formData.start).toFormat(
                "yyyy-MM-dd'T'HH:mm"
              )}
              required
            />
          </div>
          <div>
            <label htmlFor="duration" className="font-Jomhuria text-5xl block">
              Duration (Minutes)
            </label>
            <input
              id="duration"
              className="p-2 outline-none w-full"
              type="number"
              min={0}
              name="duration"
              onChange={handleChange}
              value={formData.duration}
              required
            />
          </div>

          <button
            type="submit"
            className="w-fit rounded-full bg-gray-400 m-1 px-5 py-2 text-black hover:text-black hover:bg-white border border-black"
          >
            Submit
          </button>
        </div>
      </form>
      <div>
        <label className="font-Jomhuria text-5xl block">Problems</label>
        <div>
          <Search onSubmit={handleProblemSearch} />
          {searchProblem &&
            !problems.find((e) => e.id === searchProblem.id) && (
              <button
                onClick={() => {
                  if (!searchProblem.id) return;

                  handleAddProblem({
                    id: searchProblem.id,
                    name: searchProblem.name,
                  });
                  setSearchProblem(null);
                }}
                className="lg:w-64 w-44 p-2 bg-white rounded-2xl my-2"
              >
                {searchProblem.name}
              </button>
            )}
        </div>
        <div className="mt-4">
          {problems.map((problem) => {
            return (
              <div className="flex justify-between p-2 border-b-2">
                {problem.name}

                <button onClick={() => handleRemoveProblem(problem)}>
                  <TrashIcon className="h-8 w-8 text-red-700" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
