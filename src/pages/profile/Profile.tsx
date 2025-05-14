import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { User } from "../../utils/interfaces";
import { user as emptyUser } from "../../utils/emptyEntities";
import { getUser, updateUser } from "../../fetch/UserFetch";
import Menu from "../../components/Menu";
import { getEmailUser, getTypeUser } from "../../session/Token";
import FormUser from "../../components/forms/FormUser";
import UserCard from "../../components/cards/UserCard";
import Statistics from "./components/Statistics";

interface UserInfo extends User {
  totalProblems?: number;
}

const Profile: FC = () => {
  const { id } = useParams();
  const type = getTypeUser();
  const [sesionUser, setSesionUser] = useState<UserInfo>(emptyUser);
  const [data, setData] = useState<UserInfo>(emptyUser);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [edit, setEdit] = useState(false);
  const [action, setAction] = useState(0);

  useEffect(() => {
    const fetchSesionUser = async () => {
      try {
        const response = await getUser(getEmailUser());
        setSesionUser(response.data.user);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    const fetchUser = async (email?: string, idUser?: number) => {
      try {
        setIsLoading(true);
        const response = await getUser(email, idUser);
        setData(response.data.user);
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

    fetchSesionUser();
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
    <div className="max-w-screen-xl w-11/12 mx-auto bg-gray-300">
      <Menu />

      <UserCard
        name={data.nickname}
        user={data}
        onSubmit={handleUpdateMyInfo}
        showButton={type === "admin" || sesionUser.email === data.email}
      />

      {edit && (
        <FormUser
          data={data}
          onSubmit={handleUpdate}
          onClose={handleClose}
          password={sesionUser.email === data.email}
        />
      )}

      <Statistics />
    </div>
  );
};

export default Profile;
