import { XCircleIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import Button from "../../components/Button";
import Menu from "../../components/Menu";
import Search from "../../components/Search";
import Table, { Column } from "../../components/Table";
import { Contest } from "../../utils/interfaces";
import {
  deleteContest,
  enrollContest,
  getContests,
  searchContests,
  unenrollContest,
} from "../../fetch/ContestFetch";
import { useNavigate } from "react-router-dom";
import { getTypeUser } from "../../session/Token";
import { AxiosResponse } from "axios";
import { apiContests as api } from "../../session/interceptor";

const ContestList = () => {
  const navigate = useNavigate();
  const type = getTypeUser();
  const [contests, setContests] = useState<Contest[]>([]);

  async function fetchContests() {
    const contestsRes = await getContests();
    setContests(contestsRes);
  }

  async function handleDelete(contest: Contest) {
    if (!contest.id) return;

    try {
      await deleteContest(contest.id);

      alert("Contest eliminado correctamente");
      fetchContests();
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Ha ocurrido un error");
      }
    }
  }

  async function handleSearch(query: string) {
    try {
      const results = await searchContests(query);

      setContests(results);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Ha ocurrido un error");
      }
    }
  }

  async function handleToggleEnroll(contest: Contest) {
    if (!contest.id) return;

    try {
      if (contest.enroll) {
        await unenrollContest(contest.id);
        alert("Unenroll sucessful");
      } else {
        await enrollContest(contest.id);
        alert("Enroll sucessful");
      }

      fetchContests();
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Ha ocurrido un error");
      }
    }
  }

  useEffect(() => {
    fetchContests();
  }, []);

  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const handleSort = (key: keyof Contest) => {
    const newOrder = sortKey === key && sortOrder === "desc" ? "asc" : "desc";
    setSortKey(key);
    setSortOrder(newOrder);

    const sorted = [...contests].sort((a, b) => {
      if (a[key] == null) return 1;
      if (b[key] == null) return -1;

      if (a[key]! < b[key]!) return newOrder === "asc" ? -1 : 1;
      if (a[key]! > b[key]!) return newOrder === "asc" ? 1 : -1;
      return 0;
    });

    setContests(sorted);
  };

  const [minDifficulty, setMinDifficulty] = useState(0);
  const [maxDifficulty, setMaxDifficulty] = useState(1);

  async function handleFilter() {
    try {
      const response: AxiosResponse = await api.get('/contest', {
        params: {
          minDifficulty: minDifficulty,
          maxDifficulty: maxDifficulty,
        }
      })
      setContests(response.data);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Ha ocurrido un error");
      }
    }
  }

  const columns: Column<Contest>[] = [
    {
      label: "Name",
      key: "name",
    },
    {
      label: "Start",
      key: "start",
      output: (value) => `${value?.toLocaleString()}`,
    },
    {
      label: "Duration",
      key: "duration",
    },
    {
      label: "Difficulty",
      key: "difficulty",
      onClick: () => handleSort("difficulty"),
      output: (value) => {
        console.log(value);

        return value && (value as number).toFixed(2);
      },
    },
  ];

  if (type === "user") {
    columns.push({
      label: "Enroll",
      key: "enroll",
      output: (value, row) => (
        <>
          {value ? (
            <button onClick={() => handleToggleEnroll(row)}>
              <CheckCircleIcon className="size-12 text-green-700" />
            </button>
          ) : (
            <button onClick={() => handleToggleEnroll(row)}>
              <XCircleIcon className="size-12 text-red-700" />
            </button>
          )}
        </>
      ),
    });
  }

  return (
    <div className="w-full">
      <Menu></Menu>
      <div className="m-10 grid grid-rows-2 grid-cols-[1fr_auto] md:grid-rows-1 md:grid-cols-[1fr_auto_auto] items-center gap-4">
        <h1 className="text-8xl text-stroke font-Jomhuria md:col-span-1 col-span-2">
          Contests
        </h1>
        <Search onSubmit={handleSearch} placeholder="Search contests" />
        {type === "admin" && (
          <Button onClick={() => navigate("create")}>Create</Button>
        )}
      </div>
      <div className="flex items-center gap-4 px-10 mb-6">
        <label className="font-bold">Difficulty Range:</label>
        <div className="flex items-center gap-2">
          <input
            type="range"
            min={0}
            max={maxDifficulty}
            step={0.1}
            value={minDifficulty}
            onChange={(e) => setMinDifficulty(parseFloat(e.target.value))}
            style={{ accentColor: "red" }}
          />
          <span>{minDifficulty}</span>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="range"
            min={minDifficulty}
            max={1}
            step={0.1}
            value={maxDifficulty}
            onChange={(e) => setMaxDifficulty(parseFloat(e.target.value))}
            style={{ accentColor: "red" }}
          />
          <span>{maxDifficulty}</span>
          <Button
            onClick={handleFilter}
            className=" px-4 py-2 rounded hover:bg-red-800 transition"
          >
            Filter
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-center pb-6 px-10">
        <Table
          columns={columns}
          data={contests}
          header={true}
          onView={(index) => navigate(`view/${contests[index].id}/details`)}
          onEdit={
            type === "admin"
              ? (index) => navigate(`edit/${contests[index].id}`)
              : undefined
          }
          onDelete={
            type === "admin"
              ? (index) => handleDelete(contests[index])
              : undefined
          }
          pagination={7}
          enableNumberPagination={true}
          activePagination={true}
        />
      </div>
    </div>
  );
};

export default ContestList;
