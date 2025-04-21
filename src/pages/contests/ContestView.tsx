// src/pages/contests/ContestDetails.tsx
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Menu from "../../components/Menu";
import Table, { Column } from "../../components/Table";
import Button from "../../components/Button";
import { ContestDetails } from "../../utils/interfaces";
import { getContestById } from "../../fetch/ContestFetch";

interface Rank {
  user: string;
  score: number;
  time: string;
}

export default function ContestView() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [contest, setContest] = useState<ContestDetails>();
  const [ranking, setRanking] = useState<Rank[]>([]);
  const [tab, setTab] = useState<"problems" | "ranking">("problems");

  useEffect(() => {
    /*
    const fetchProblems = async () => {
      const fakeProblems: ContestProblem[] = [
        { id: 1, letter: "A", name: "Adivina el número" },
        {
          id: 2,
          letter: "B",
          name: "Grafo de ciudades",
        },
      ];
      setProblems(fakeProblems);
    };

    */
    const fetchRanking = async () => {
      const fakeRanking = [
        { user: "alice", score: 100, time: "00:32:10" },
        { user: "bob", score: 80, time: "00:45:22" },
        { user: "charlie", score: 60, time: "01:15:08" },
      ];
      setRanking(fakeRanking);
    };

    fetchContest();
    fetchRanking();
  }, [id]);

  async function fetchContest() {
    if (!id || Number.isNaN(parseInt(id))) return;

    const res = await getContestById(parseInt(id));

    setContest(res);
  }

  const problemColumns: Column<ContestDetails["problems"][number]>[] = [
    {
      label: "#",
      key: "order",
      output: (order) => {
        if (!order) return;

        const orderNum = typeof order === "number" ? order : parseInt(order);
        const ascii = orderNum + "A".charCodeAt(0) - 1;
        return <>{String.fromCharCode(ascii)}</>;
      },
    },
    {
      label: "Name",
      key: "name",
    },
  ];

  const rankingColumns: Column<Rank>[] = [
    { label: "User", key: "user" },
    { label: "Score", key: "score" },
    { label: "Time", key: "time" },
  ];

  if (!contest?.problems) return;

  return (
    <div className="w-full">
      <Menu />
      <div className="px-10 py-6">
        <h1 className="text-6xl font-Jomhuria text-stroke mb-4">
          Contest #{id}
        </h1>
        <div className="flex gap-4 mb-6">
          <Button
            onClick={() => setTab("problems")}
            variant={`${tab === "problems" ? "DARK" : "DEFAULT"}`}
          >
            Problems
          </Button>
          <Button
            onClick={() => setTab("ranking")}
            variant={`${tab === "ranking" ? "DARK" : "DEFAULT"}`}
          >
            Ranking
          </Button>
        </div>

        <div className="flex items-center justify-center">
          {tab === "problems" && (
            <Table
              columns={problemColumns}
              data={contest.problems}
              header={true}
              pagination={contest.problems.length}
              enableNumberPagination={false}
              activePagination={false}
              onChange={(index) =>
                navigate(`/problem/${contest.problems[index].id}`)
              }
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
}
