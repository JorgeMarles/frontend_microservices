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

interface topicStadistic {
  name: string,
  wrong: number,
  accepted: number,
  total?: number
}

interface Stadistic {
  acceptedProblems: number;
  wrongProblems: number;
  totalProblems: number;
  topic: topicStadistic[];
};

const process = async (data: topicStadistic[]): Promise<Stadistic> => {
  let wrongAnswer = 0, acceptedAnswer = 0;

  const updatedTopics = data.map(item => {
    const total = item.wrong + item.accepted;
    wrongAnswer += item.wrong;
    acceptedAnswer += item.accepted;
    return { ...item, total };
  });

  const response: Stadistic = {
    wrongProblems: wrongAnswer,
    acceptedProblems: acceptedAnswer,
    totalProblems: wrongAnswer + acceptedAnswer,
    topic: updatedTopics,
  };

  return response;
};

const Profile: FC = () => {
  const { id } = useParams();
  const [data, setData] = useState<User>(emptyUser);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [edit, setEdit] = useState(false);
  const [action, setAction] = useState(0);
  const [stadistics, setStadistics] = useState<Stadistic>();
  const type = getTypeUser();

  useEffect(() => {
    const fetchUser = async (email?: string, idUser?: number) => {
      try {
        setIsLoading(true);
        const response = await getUser(email, idUser);
        // const responseProblem = await getProblemsInfo(response.data.user.id);
        const data = await process(stadisticsJSON.topics);
        setStadistics(data);
        const userInfo = {
          ...response.data.user,
          totalProblems: data.totalProblems,
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
  console.log(stadistics);

  return (
    <div className='w-full bg-gray-300'>
      <Menu />
      <div className='md:grid md:grid-cols-7 mx-10 flex items-center'>
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
          {!stadistics || (stadistics?.totalProblems === 0) ? (
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
            <div className="w-full flex flex-col items-center justify-center gap-6">
            <div className="w-3/4">
              <DoughnutChart
                data={[
                  { label: "# Accepted", value: stadistics.acceptedProblems },
                  { label: "# Wrong Answer", value: stadistics.wrongProblems },
                ]}
              />
            </div>
            <div className="w-4/5">
              <BarChart
                data={stadistics.topic.map(({ name, accepted }) => ({
                  name,
                  total: accepted,
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
