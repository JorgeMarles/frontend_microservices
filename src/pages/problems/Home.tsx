import { FC, useEffect, useState } from "react";
import { Problem } from "../../utils/interfaces";
import Table from "../../components/Table";
import Card from "../../components/cards/Card";
import Combobox from "../../components/Combobox";
import { Topic } from "../../utils/interfaces";
import { deleteTopic, getTopics } from "../../fetch/TopicFetch";
import { disableProblem, getProblems } from "../../fetch/ProblemFetch";
import difficulties from "../../data/difficulties.json";
import Menu from "../../components/Menu";
import { iota } from "../../utils/services";
import Pagination from "../../components/Pagination";
import { useNavigate } from "react-router-dom";
import { getTypeUser } from "../../session/Token";
import Button from "../../components/Button";
import FormTopic from "../../components/forms/FormTopic";
import Search from "../../components/Search";

const addFormatSubmissions = (values: Problem[]) => {
  for (let i = 0; i < values.length; i++) {
    values[i].acceptedSubmissions = 500;
    values[i].totalSubmissions = 800;
    values[i].submissions =
      values[i].acceptedSubmissions + "/" + values[i].totalSubmissions;
  }
};

const pagination = 6;

type Modals = null | "CREATE_TOPIC";

const Home: FC = () => {
  const navigate = useNavigate();
  const [problems, setProblems] = useState<Problem[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [topicSelected, setTopicSelected] = useState("Introductory problems");
  const [difficultySelected, setDifficultySelected] = useState<
    string | undefined
  >(undefined);
  const [indexes, setIndexes] = useState<number[]>(iota(0, pagination));
  const [page, setPage] = useState(0);
  const [action, setAction] = useState(0);
  const type = getTypeUser();
  const columns = [
    { label: "Problem's name", key: "name" },
    { label: "Difficulty", key: "difficulty" },
    // { label: "Submissions", key: "submissions" },
    // { label: "Topic", key: "topic.name" }
  ];
  const [currentModal, setCurrentModal] = useState<Modals>(null);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await getTopics();
        const values: Topic[] = Object.values(response.topics);
        const size = values.length;
        for (let i = 1; i < size; ++i) {
          if (values[i].name == topicSelected) {
            [values[0], values[i]] = [values[i], values[0]];
          }
        }
        setTopics(values);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchTopics();
  }, []);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await getProblems(topicSelected, difficultySelected);
        const values: Problem[] = Object.values(response.problems);
        addFormatSubmissions(values);
        setProblems(values);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchProblems();
  }, [topicSelected, difficultySelected, action]);

  const handleChangeTopic = (value: string) => {
    setTopicSelected(value);
  };

  const handleChangeDifficulty = (value: string | undefined) => {
    if (value === "none") value = undefined;
    setDifficultySelected(value);
  };

  const handleChangeProblem = (index: number) => {
    navigate(`/problem/${problems[index].id}`);
  };

  const handlePagination = (newPage: number) => {
    const start = newPage * pagination,
      end = Math.min(topics.length, newPage * pagination + pagination);
    setPage(newPage);
    setIndexes(iota(start, end));
  };

  const handleEdit = (index: number) => {
    navigate(`/createProblem/${problems[index].id}`);
  };
  const handleDelete = async (index: number) => {
    if (!problems[index].id) return;
    try {
      const response = await disableProblem(problems[index].id);
      if (response?.status == 200) {
        setAction(1 - action);
        alert("The problem was disabled.");
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleTopicDelete = async (topic: Topic) => {
    try {
      await deleteTopic(topic);
      alert("Topic deleted sucesfully");
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Something went wrong");
      }
    }

    navigate(0);
  };

  return (
    <div className="bg-gray-300">
      {currentModal === "CREATE_TOPIC" && (
        <FormTopic
          onSubmit={() => {
            setCurrentModal(null);
            navigate(0);
          }}
          onClose={() => setCurrentModal(null)}
        ></FormTopic>
      )}

      <Menu></Menu>
      <div className="w-full grid grid-cols-2 gap-4 my-5">
        <div className="p-8">
          <div className="grid grid-cols-2 grid-rows-[1fr_auto_1fr] lg:grid-rows-1 lg:grid-cols-[1fr_auto_auto_auto] gap-4 pb-3 items-center">
            <h1 className="text-8xl text-stroke font-Jomhuria">
              {topicSelected}
            </h1>
            <Combobox
              data={difficulties}
              onChange={handleChangeDifficulty}
              defaultName={difficulties[0].name}
            />
            <Button
              onClick={() => {
                const topic = topics.find((t) => t.name === topicSelected);
                if (topic) handleTopicDelete(topic);
              }}
            >
              Delete Topic
            </Button>
          </div>
          <div className="flex justify-between my-4">
            <Button
              onClick={() => {
                navigate("/createProblem");
              }}
            >
              Create Problem
            </Button>
            <Search onSubmit={() => {}} placeholder="Search Problem" />
          </div>
          {type === "admin" && (
            <Table<Problem>
              data={problems}
              columns={columns}
              header={false}
              onChange={handleChangeProblem}
              pagination={5}
              enableNumberPagination={true}
              onDelete={handleDelete}
              onEdit={handleEdit}
              activePagination={true}
            />
          )}
          {type !== "admin" && (
            <Table<Problem>
              data={problems}
              columns={columns}
              header={false}
              onChange={handleChangeProblem}
              pagination={5}
              enableNumberPagination={true}
              activePagination={true}
            />
          )}
        </div>
        <div className="mx-5 flex">
          <div className="h-full w-1 bg-gray-500 "></div>
          <div className="pl-5 ml-5 w-full h-full">
            <div className="flex justify-between items-center">
              <h1 className="font-Jomhuria text-7xl text-stroke">Topics</h1>
              <Button onClick={() => setCurrentModal("CREATE_TOPIC")}>
                Create
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-7">
              {indexes.map((index) => {
                if (!topics[index]) return null;
                return (
                  <Card
                    key={index}
                    name={topics[index].name}
                    onClick={handleChangeTopic}
                    isSelected={topics[index].name == topicSelected}
                  />
                );
              })}
            </div>
            <Pagination
              enableNumber={false}
              page={page}
              onPagination={handlePagination}
              pagination={pagination}
              size={topics.length}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
