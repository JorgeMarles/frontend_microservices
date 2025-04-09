// src/pages/contests/ContestDetails.tsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Menu from "../../components/Menu";
import Table, { Column } from "../../components/Table";
import Button from "../../components/Button";

interface Problem {
  id: number;
  name: string;
  difficulty: string;
}

interface Rank {
  user: string;
  score: number;
  time: string;
}

const ContestDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [problems, setProblems] = useState<Problem[]>([]);
  const [ranking, setRanking] = useState<Rank[]>([]);
  const [tab, setTab] = useState<"problems" | "ranking">("problems");

  useEffect(() => {
    const fetchProblems = async () => {
      const fakeProblems = [
        { id: 1, name: "Adivina el número", difficulty: "Fácil" },
        { id: 2, name: "Grafo de ciudades", difficulty: "Difícil" },
      ];
      setProblems(fakeProblems);
    };

    const fetchRanking = async () => {
      const fakeRanking = [
        { user: "alice", score: 100, time: "00:32:10" },
        { user: "bob", score: 80, time: "00:45:22" },
        { user: "charlie", score: 60, time: "01:15:08" },
      ];
      setRanking(fakeRanking);
    };

    fetchProblems();
    fetchRanking();
  }, [id]);

  const problemColumns: Column<Problem>[] = [
    { label: "Name", key: "name" },
    { label: "Difficulty", key: "difficulty" },
  ];

  const rankingColumns: Column<Rank>[] = [
    { label: "User", key: "user" },
    { label: "Score", key: "score" },
    { label: "Time", key: "time" },
  ];

  return (
    <div>
      <Menu />
      <div className="px-10 py-6">
        <h1 className="text-6xl font-Jomhuria text-stroke mb-4">
          Contest #{id}
        </h1>
        <div className="flex gap-4 mb-6">
          <Button
            onClick={() => setTab("problems")}
            className={`${
              tab === "problems" ? "bg-blue-700 text-white" : "bg-gray-200"
            }`}
          >
            Problems
          </Button>
          <Button
            onClick={() => setTab("ranking")}
            className={`${
              tab === "ranking" ? "bg-blue-700 text-white" : "bg-gray-200"
            }`}
          >
            Ranking
          </Button>
        </div>

        <div className="flex items-center justify-center">
          {tab === "problems" && (
            <Table
              columns={problemColumns}
              data={problems}
              header={true}
              pagination={5}
              enableNumberPagination={true}
              activePagination={true}
            />
          )}

          {tab === "ranking" && (
            <Table
              columns={rankingColumns}
              data={ranking}
              header={true}
              pagination={5}
              enableNumberPagination={true}
              activePagination={true}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ContestDetails;
