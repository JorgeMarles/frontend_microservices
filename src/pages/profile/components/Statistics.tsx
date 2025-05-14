import { useEffect, useState } from "react";
import {
  getContestStats,
  getProblemsStats,
} from "../../../fetch/StatisticsFetch";
import { useParams } from "react-router-dom";
import { StatsContest, StatsProblems } from "../../../utils/interfaces";
import { Line, Pie } from "react-chartjs-2";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Chart as ChartJS, ChartOptions } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import "chart.js/auto";
import { getIdUser } from "../../../session/Token";
ChartJS.register(ChartDataLabels);

export default function Statistics() {
  const { id } = useParams();
  const [contests, setContests] = useState<StatsContest>();
  const [problems, setProblems] = useState<StatsProblems>();

  useEffect(() => {
    const idInt = id ? parseInt(String(id)) : getIdUser();

    const fetchProblems = async () => {
      const problems = await getProblemsStats(idInt);
      setProblems(problems);
    };

    const fetchContests = async () => {
      const contests = await getContestStats(idInt);
      setContests(contests);
    };

    fetchProblems();
    fetchContests();
  }, [id]);

  function getPieOptions(title: string) {
    const chartOptions: ChartOptions<"pie"> = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "right",
        },
        title: {
          display: true,
          text: title,
          align: "start",
          color: "black",
          font: {
            size: 32,
            family: "Jomhuria, serif",
          },
        },
        datalabels: {
          formatter: (value, context) => {
            const data = context.chart.data.datasets[0].data;
            const total = data.reduce(
              (acc, val) => Number(acc) + Number(val),
              0
            );
            if (typeof total !== "number") return;
            const percentage = (value / total) * 100;

            if (percentage === 0) return "";

            return percentage.toFixed(1) + "%";
          },
          color: "#fff",
          font: {
            weight: "bold",
            size: 16,
          },
        },
      },
    };

    return chartOptions;
  }

  function getLineOptions(
    title: string,
    scales: ChartOptions<"line">["scales"]
  ) {
    const chartOptions: ChartOptions<"line"> = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: title,
          align: "start",
          color: "black",
          font: {
            size: 32,
            family: "Jomhuria, serif",
          },
        },
      },
      scales,
    };

    return chartOptions;
  }

  function getBackgroundColor(_: unknown, i: number) {
    return [
      "#3B82F6", // blue-500
      "#EF4444", // red-500
      "#10B981", // emerald-500
      "#F59E0B", // amber-500
      "#8B5CF6", // violet-500
      "#EC4899", // pink-500
      "#22D3EE", // cyan-400
      "#F43F5E", // rose-500
      "#6366F1", // indigo-500
      "#84CC16", // lime-500
    ][i % 10];
  }

  if (problems?.total_problems === 0) return;

  return (
    <div className="my-10">
      <h2 className="md:text-6xl text-4xl text-stroke font-Jomhuria">
        Statistics
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 my-5">
        <dl className="bg-white p-4 rounded-lg shadow-sm">
          <dt className="font-bold font-Jomhuria text-3xl">Problems tried</dt>
          <dd>{problems?.total_problems} Problems</dd>
        </dl>
        <dl className="bg-white p-4 rounded-lg shadow-sm">
          <dt className="font-bold font-Jomhuria text-3xl">Problems solved</dt>
          <dd>{problems?.total_solved} Problems</dd>
        </dl>
        <dl className="bg-white p-4 rounded-lg shadow-sm">
          <dt className="font-bold font-Jomhuria text-3xl">Average attempts</dt>
          <dd>{problems?.average_attempts}</dd>
        </dl>
        <dl className="bg-white p-4 rounded-lg shadow-sm">
          <dt className="font-bold font-Jomhuria text-3xl">
            Number of contests
          </dt>
          <dd>{contests?.total_contests}</dd>
        </dl>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <AspectRatio ratio={4 / 3} className="w-full p-6 bg-white rounded-lg">
          <Pie
            className="w-full h-full"
            data={{
              labels: problems?.veredicts?.map((veredict) => veredict.name),
              datasets: [
                {
                  data: problems?.veredicts?.map((veredict) => veredict.total),
                  backgroundColor: problems?.veredicts?.map(getBackgroundColor),
                },
              ],
            }}
            options={getPieOptions("Verdict")}
          />
        </AspectRatio>
        <AspectRatio ratio={4 / 3} className="w-full p-6 bg-white rounded-lg">
          <Pie
            className="w-full h-full"
            data={{
              labels: problems?.topics?.map((topic) => topic.name),
              datasets: [
                {
                  data: problems?.topics?.map((topic) => topic.total),
                  backgroundColor: problems?.topics?.map(getBackgroundColor),
                },
              ],
            }}
            options={getPieOptions("Topics")}
          />
        </AspectRatio>
        <AspectRatio ratio={4 / 3} className="w-full p-6 bg-white rounded-lg">
          <Line
            className="w-full h-full"
            options={getLineOptions("Ranking de las ultimas 5 competencias", {
              x: {
                title: {
                  display: true,
                  text: "Contest ID",
                },
                reverse: true,
              },
              y: {
                reverse: true,
              },
            })}
            data={{
              labels: contests?.ranking?.map((c) => c.id),
              datasets: [
                {
                  label: "Top",
                  data: contests?.ranking?.map((c) => c.percentile),
                },
                {
                  label: "Posicion",
                  data: contests?.ranking?.map((c) => c.position),
                },
              ],
            }}
          />
        </AspectRatio>
      </div>
    </div>
  );
}
