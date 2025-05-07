import { FC, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { ContestPosition, Submission, User } from "../utils/interfaces";
import { user as emptyUser } from "../utils/emptyEntities";
import { getUser, updateUser } from "../fetch/UserFetch";
import Menu from "../components/Menu";
import { getEmailUser, getTypeUser } from "../session/Token";
import FormUser from "../components/forms/FormUser";
import UserCard from "../components/cards/UserCard";

import stadisticsJSON from "../data/stadistics.json";
import { getAllByUser } from "../fetch/SubmissionFetch";
import { getContestPositions } from "../fetch/ContestFetch";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { AspectRatio } from "../components/AspectRatio";

interface TopicStadistic {
  name: string;
  wa: number; // Wrong Answer
  ac: number; // Accepted
  rte: number; // RunTime Error
  tle: number; // Time Limited Exceded
  ce: number; // Compilation Error
  total?: number;
}

interface Veredict {
  label: string;
  type: string;
  value: number;
}

interface UserInfo extends User {
  totalProblems?: number;
}

const process = async (
  data: TopicStadistic[]
): Promise<{
  topics: TopicStadistic[];
  veredicts: Veredict[];
  total: number;
}> => {
  const veredicts: Veredict[] = [
    {
      label: "Accepted",
      type: "Accepted",
      value: 0,
    },
    {
      label: "Wrong answer",
      type: "Wrong answer",
      value: 0,
    },
    {
      label: "Time limited exceded",
      type: "Time Limit Exceeded",
      value: 0,
    },
    {
      label: "Runtime error",
      type: "Runtime error",
      value: 0,
    },
    {
      label: "Compilation error",
      type: "Compilation error",
      value: 0,
    },
  ];
  const updatedTopics = data.map((item) => {
    const total = item.ac + item.wa + item.tle + item.rte + item.ce;
    veredicts[0].value += item.ac;
    veredicts[1].value += item.wa;
    veredicts[2].value += item.tle;
    veredicts[3].value += item.rte;
    veredicts[4].value += item.ce;
    return { ...item, total };
  });
  return {
    topics: updatedTopics,
    veredicts: veredicts,
    total: veredicts[0].value,
  };
};

const processSubmissions = (data: Submission[]) => {
  const veredicts: Veredict[] = [
    {
      label: "Accepted",
      type: "Accepted",
      value: 0,
    },
    {
      label: "Wrong answer",
      type: "Wrong answer",
      value: 0,
    },
    {
      label: "Time limited exceded",
      type: "Time Limit Exceeded",
      value: 0,
    },
    {
      label: "Runtime error",
      type: "Runtime error",
      value: 0,
    },
    {
      label: "Compilation error",
      type: "Compilation error",
      value: 0,
    },
  ];
  let total = 0;
  for (const item of data) {
    for (const veredict of veredicts) {
      if (item.veredict === veredict.type) {
        veredict.value++;
        total++;
      }
    }
  }
  return { veredicts, total };
};

const Profile: FC = () => {
  const { id } = useParams();
  const [data, setData] = useState<UserInfo>(emptyUser);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [edit, setEdit] = useState(false);
  const [action, setAction] = useState(0);
  const [veredicts, setVeredicts] = useState<Veredict[]>();
  const [topics, setTopics] = useState<TopicStadistic[]>();
  const [auxiliar, setAuxiliar] = useState(0);
  const [contestPositions, setContestPositions] = useState<ContestPosition[]>(
    []
  );
  const type = getTypeUser();

  useEffect(() => {
    const fetchUser = async (email?: string, idUser?: number) => {
      try {
        setIsLoading(true);
        const response = await getUser(email, idUser);
        // const responseProblem = await getProblemsInfo(response.data.user.id);
        const responseSubmissions = await getAllByUser(response.data.user.id);
        const submissions: Submission[] = responseSubmissions?.data;
        const data = await process(stadisticsJSON.topics);
        const results = processSubmissions(submissions);
        setVeredicts(results.veredicts);
        setAuxiliar(results.total);
        setTopics(data.topics);
        const userInfo = {
          ...response.data.user,
          totalProblems: data.total,
        };
        setData(userInfo);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id === undefined) {
      fetchUser(getEmailUser(), undefined);
    } else {
      fetchUser(undefined, parseInt(id));
    }

    const fetchPositions = async () => {
      try {
        const data = await getContestPositions();
        setContestPositions(data.rankingInfo);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchPositions();
  }, [id]);

  const handleClose = () => {
    setEdit(false);
  };

  const handleUpdateMyInfo = () => {
    setEdit(true);
  };

  const handleUpdate = async (user: User) => {
    if ("newPassword" in user) {
      if ("repeatNewPassword" in user) {
        if (user.newPassword !== user.repeatNewPassword) {
          alert("Passwords do not match. Please verify and try again.");
          return;
        }
      } else {
        alert("Please you forgot to add the repeat new password");
        return;
      }
    }
    try {
      const response = await updateUser(user);
      if (response.status == 200) {
        setEdit(false);
        setAction(1 - action);
        alert("User's data updated successfully.");
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
      alert("Data invalid: please check the password");
    }
  };
  if (isLoading) {
    return (
      <div className="bg-gray-300 w-screen">
        <Menu />
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-300">
      <Menu />
      <div className="grid md:grid-cols-7 mx-10 grid-cols-1 items-center mb-3">
        <div className="md:col-span-3 flex justify-center items-center">
          <div className="px-10 pb-10 w-full">
            <UserCard
              name={data.nickname}
              user={data}
              onSubmit={handleUpdateMyInfo}
            />
          </div>
        </div>
        {contestPositions.length > 0 && (
          <div className="md:col-span-4 ">
            <AspectRatio
              ratio={4 / 3}
              className="w-full p-6 bg-white rounded-lg"
            >
              <Line
                className="w-full h-full"
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: "top" as const,
                    },
                    title: {
                      display: true,
                      text: "Ranking de las ultimas 5 competencias",
                    },
                  },
                  scales: {
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
                  },
                }}
                data={{
                  labels: contestPositions.map((c) => c.id),
                  datasets: [
                    {
                      label: "Top",
                      data: contestPositions.map((c) => c.percentile),
                    },
                    {
                      label: "Posicion",
                      data: contestPositions.map((c) => c.position),
                    },
                  ],
                }}
              />
            </AspectRatio>
          </div>
        )}
        {edit && (
          <FormUser
            data={data}
            onSubmit={handleUpdate}
            onClose={handleClose}
            password={true}
          />
        )}
      </div>
    </div>
  );
};

export default Profile;
