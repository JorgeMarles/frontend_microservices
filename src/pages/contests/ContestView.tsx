// src/pages/contests/ContestDetails.tsx
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Menu from "../../components/Menu";
import Table, { Column } from "../../components/Table";
import Button from "../../components/Button";
import { ContestDetails, ContestRanking } from "../../utils/interfaces";
import { getContestById, getContestRanking } from "../../fetch/ContestFetch";

export default function ContestView() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [contest, setContest] = useState<ContestDetails>();
  const [ranking, setRanking] = useState<ContestRanking[]>();
  const [tab, setTab] = useState<"problems" | "ranking">("problems");

  useEffect(() => {
    fetchContest();
  }, [id]);

  async function fetchRanking() {
    if (!id || Number.isNaN(parseInt(id))) return;

    const res = await getContestRanking(parseInt(id));

    setRanking(res);
  }

  async function fetchContest() {
    if (!id || Number.isNaN(parseInt(id))) return;

    const res = await getContestById(parseInt(id));

    setContest(res);
  }

  function orderToLetter(order: string | number | undefined) {
    if (!order) return;

    const orderNum = typeof order === "number" ? order : parseInt(order);
    const ascii = orderNum + "A".charCodeAt(0) - 1;
    return String.fromCharCode(ascii);
  }

  function secsFormat(seconds: number) {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    function zeroFill(n: number) {
      return n > 9 ? n : `0${n}`;
    }

    return `${hours > 0 ? `${zeroFill(hours)}:` : ""}${zeroFill(
      mins
    )}:${zeroFill(secs)}`;
  }

  const problemColumns: Column<ContestDetails["problems"][number]>[] = [
    {
      label: "#",
      key: "order",
      output: (order) => {
        return orderToLetter(order);
      },
    },
    {
      label: "Name",
      key: "name",
    },
  ];

  const rankingColumns: Column<ContestRanking>[] = [
    {
      label: "#",
      key: "",
      output: (_value, _row, index) => index + 1,
    },
    {
      label: "User",
      key: "user",
      output: (u) => {
        const user = u as ContestRanking["user"];

        if (!user) return;

        return user.nickname;
      },
    },
    { label: "=", key: "problems_solved" },
    { label: "Penalty", key: "penalty" },
    ...(contest?.problems.map((problem) => ({
      label: orderToLetter(problem.order) || "",
      key: "submissions",
      output: (s: unknown) => {
        if (!s) return;

        const submissions = s as ContestRanking["submissions"];
        const problemSubmission = submissions.find(
          (submission) => submission.asignation.order === problem.order
        );

        if (!problemSubmission || !problemSubmission.solved) return "";

        return (
          <div>
            <p className="text-green-700 font-bold">
              +
              {problemSubmission.attemps - 1 > 0
                ? problemSubmission.attemps - 1
                : ""}
            </p>
            <p>{secsFormat(problemSubmission.time)}</p>
          </div>
        );
      },
    })) || []),
  ];

  if (!contest?.problems) return;

  return (
    <div className="w-full">
      <Menu />
      <div className="px-10 py-6">
        <h1 className="text-6xl font-Jomhuria text-stroke mb-4">
          {contest.name}
        </h1>
        <div className="flex gap-4 mb-6">
          <Button
            onClick={() => setTab("problems")}
            variant={`${tab === "problems" ? "DARK" : "DEFAULT"}`}
          >
            Problems
          </Button>
          <Button
            onClick={async () => {
              fetchRanking();
              setTab("ranking");
            }}
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
              data={ranking || []}
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
