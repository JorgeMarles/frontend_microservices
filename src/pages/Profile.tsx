import { FC, useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { User } from '../utils/interfaces';
import { user as emptyUser } from '../utils/emptyEntities';
import { getUser, updateUser } from '../fetch/UserFetch';
import Menu from '../components/Menu';
import { getEmailUser, getTypeUser } from '../session/Token';
import FormUser from '../components/forms/FormUser';
import UserCard from '../components/cards/UserCard';

import stadisticsJSON from '../data/stadistics.json';
import BarChart from '../components/stadistics/BarChart';
import DoughnutChart from '../components/stadistics/DoughnutChart';

interface TopicStadistic {
  name: string,
  wa: number,   // Wrong Answer
  ac: number,   // Accepted
  rte: number,  // RunTime Error
  tle: number,  // Time Limited Exceded
  ce: number,   // Compilation Error
  total?: number
}

interface Veredict {
  label: string;
  type: string;
  value: number
};

interface UserInfo extends User {
  totalProblems?: number;
}

const process = async (data: TopicStadistic[]): Promise<{ topics: TopicStadistic[], veredicts: Veredict[], total: number }> => {
  const veredicts: Veredict[] = [
    {
      label: "Accepted",
      type: "accepted",
      value: 0,
    },
    {
      label: "Wrong answer",
      type: "wrong answer",
      value: 0,
    },
    {
      label: "Time limited exceded",
      type: "tle",
      value: 0,
    },
    {
      label: "Runtime error",
      type: "rte",
      value: 0,
    },
    {
      label: "Compilation error",
      type: "compilation",
      value: 0,
    }
  ];
  const updatedTopics = data.map(item => {
    const total = item.ac + item.wa + item.tle + item.rte + item.ce;
    veredicts[0].value += item.ac;
    veredicts[1].value += item.wa;
    veredicts[2].value += item.tle;
    veredicts[3].value += item.rte;
    veredicts[4].value += item.ce;
    return { ...item, total };
  });
  return { topics: updatedTopics, veredicts: veredicts, total: veredicts[0].value };
};

const Profile: FC = () => {
  const { id } = useParams();
  const [data, setData] = useState<UserInfo>(emptyUser);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [edit, setEdit] = useState(false);
  const [action, setAction] = useState(0);
  const [veredicts, setVeredicts] = useState<Veredict[]>();
  const [topics, setTopics] = useState<TopicStadistic[]>();
  const type = getTypeUser();
  useEffect(() => {
    const fetchUser = async (email?: string, idUser?: number) => {
      try {
        setIsLoading(true);
        const response = await getUser(email, idUser);
        // const responseProblem = await getProblemsInfo(response.data.user.id);
        const data = await process(stadisticsJSON.topics);
        setVeredicts(data.veredicts);
        setTopics(data.topics);
        const userInfo = {
          ...response.data.user,
          totalProblems: data.total,
        };
        setData(userInfo);

      } catch (error) {
        console.error('Error fetching data: ', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id === undefined) {
      fetchUser(getEmailUser(), undefined);
    }
    else {
      fetchUser(undefined, parseInt(id));
    }


  }, [id]);

  const handleClose = () => {
    setEdit(false);
  }

  const handleUpdateMyInfo = () => {
    setEdit(true);
  }

  const handleUpdate = async (user: User) => {
    if ("newPassword" in user) {
      if ("repeatNewPassword" in user) {
        if (user.newPassword !== user.repeatNewPassword) {
          alert("Passwords do not match. Please verify and try again.");
          return;
        }
      }
      else {
        alert("Please you forgot to add the repeat new password");
        return;
      }
    }
    try {
      const response = await updateUser(user);
      if (response.status == 200) {
        setEdit(false);
        setAction(1 - action);
        alert("User's data updated successfully.")
      }
    }
    catch (error) {
      console.error('Error fetching data: ', error);
      alert("Data invalid: please check the password");
    }
  }
  if (isLoading) {
    return (
      <div className='bg-gray-300 w-screen'>
        <Menu />
        Loading...
      </div>
    );
  }

  return (
    <div className='w-full bg-gray-300'>
      <Menu />
      <div className='md:grid md:grid-cols-7 mx-10 flex items-center mb-3'>
        <div className="col-span-3 flex justify-center items-center">
          <div className='px-10 pb-10 w-full'>
            <UserCard
              name={data.nickname}
              user={data}
              onSubmit={handleUpdateMyInfo}
            />
          </div>
        </div>
        <div className='col-span-4 flex justify-center w-full h-full'>
          {!topics || !veredicts || (data?.totalProblems === 0) ? (
            <div className='m-8 p-8'>
              <div className="flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-800 border-solid"></div>
              </div>
              {type === "admin" ? (
                <>
                  <div className='flex justify-center items-center p-8'>
                    <p className='md:text-7xl text-6xl text-stroke font-Jomhuria text-gray-800'>
                      No submissions yet?
                    </p>
                    <p className='text-5xl ml-3'>🧐</p>
                  </div>
                  <p className='text-xl text-gray-800'>
                    This user hasn’t submitted any problems yet. Maybe they’re just getting warmed up, or perhaps they're waiting for the perfect moment to surprise us!
                  </p>
                  <div className="bg-red-800 hover:bg-white hover:text-gray-800 text-white py-3 px-6 my-5 rounded-full flex items-center justify-center shadow-md transition-all duration-200">
                    <NavLink
                      to="/users"
                      className="text-center w-full h-full text-xl font-medium"
                    >
                      Back to Admin Dashboard
                    </NavLink>
                  </div>
                </>
              ) : (
                <>
                  <div className='flex'>
                    <p className='md:text-7xl text-6xl text-stroke font-Jomhuria'>Where are your stats?</p>
                    <p className='text-5xl'>🤔</p>
                  </div>
                  <p className='text-xl text-gray-800'>Don't worry, solving problems is more fun than it seems. Start now!</p>
                  <div className="bg-red-800 hover:bg-white hover:text-red-900 text-white py-3 px-6 my-5 rounded-full flex items-center justify-center shadow-md transition-all duration-200">
                    <NavLink
                      to="/home"
                      className="text-center w-full h-full text-xl font-medium"
                    >
                      Go home!!!
                    </NavLink>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="w-full h-full grid grid-rows-5 gap-2 items-center py-5">
              <div className="w-full h-full row-span-2">
                <DoughnutChart
                  data={veredicts}
                />
              </div>
              <div className="w-full row-span-3">
                <BarChart
                  data={topics
                    .filter(({ ac }) => ac !== 0) 
                    .map(({ name, ac }) => ({
                      name,
                      total: ac, 
                    }))}
                />
              </div>
            </div>

          )}
        </div>
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
