import { useEffect, useState } from "react";
import Button from "../../components/Button";
import Menu from "../../components/Menu";
import Search from "../../components/Search";
import Table from "../../components/Table";
import { Contest } from "../../utils/interfaces";
import {
  deleteContest,
  getContests,
  searchContests,
} from "../../fetch/ContestFetch";
import { useNavigate } from "react-router-dom";

const ContestList = () => {
  const navigate = useNavigate();
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
      navigate(0);
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

  useEffect(() => {
    fetchContests();
  }, []);

  return (
    <div>
      <Menu></Menu>
      <div className="grid grid-cols-[1fr_auto_auto] items-center gap-4">
        <h1 className="text-8xl text-stroke font-Jomhuria">Contests</h1>
        <Search onSubmit={handleSearch} placeholder="Search contests" />
        <Button onClick={() => navigate("create")}>Create</Button>
      </div>
      <div className="flex items-center justify-center pb-6 px-10">
        <Table
          columns={[
            {
              label: "Name",
              key: "name",
            },
            {
              label: "Start",
              key: "start",
            },
            {
              label: "Duration",
              key: "duration",
            },
          ]}
          data={contests}
          header={true}
          onView={(index) => navigate(`view/${contests[index].id}`)}
          onEdit={(index) => navigate(`edit/${contests[index].id}`)}
          onDelete={(index) => handleDelete(contests[index])}
          pagination={7}
          enableNumberPagination={true}
          activePagination={true}
        />
      </div>
    </div>
  );
};

export default ContestList;
