import { useEffect, useState } from "react";
import Menu from "../../components/Menu";
import { getTypeUser } from "../../session/Token";
import { disableUser, getUsers } from "../../fetch/UserFetch";
import { User } from "../../utils/interfaces";
import Table from "../../components/Table";
import { useNavigate } from "react-router-dom";
import Search from "../../components/Search";

export default function UserList() {
  const type = getTypeUser();
  const [users, setUsers] = useState<User[]>([]);
  const [action, setAction] = useState(0);
  const navigate = useNavigate();

  const columns = [
    { label: "User", key: "nickname" },
    { label: "Email", key: "email" },
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchUsers();
  }, [action]);

  const handleView = (index: number) => {
    navigate(`/profile/${users[index].id}`);
  };

  const handleDelete = async (index: number) => {
    try {
      const response = await disableUser(users[index].email);
      if (response.status == 200) {
        setAction(1 - action);
        alert("User disabled successfully.");
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
      alert("Data invalid: please check the password");
    }
  };

  async function handleSearch(query: string) {
    try {
      const results = await getUsers(
        query.length > 0 && {
          q: query,
        }
      );

      setUsers(results.data.users);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Ha ocurrido un error");
      }
    }
  }

  return (
    <div className="max-w-screen-xl w-11/12 mx-auto bg-gray-300">
      <Menu />
      <div className="m-5 grid grid-rows-2 grid-cols-[1fr_auto] md:grid-rows-1 md:grid-cols-[1fr_auto] items-center gap-4">
        <h1 className="text-8xl text-stroke font-Jomhuria md:col-span-1 col-span-2">
          Users
        </h1>
        <Search onSubmit={handleSearch} placeholder="Search users" />
      </div>
      <Table<User>
        data={users}
        columns={columns}
        enableNumberPagination={true}
        header={true}
        pagination={6}
        onDelete={type === "admin" ? handleDelete : undefined}
        onView={handleView}
        activePagination={true}
      />
    </div>
  );
}
