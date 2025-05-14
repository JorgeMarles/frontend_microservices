import { FC } from "react";
import { User } from "../../utils/interfaces";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

interface UserInfo extends User {
  totalProblems?: number;
}

interface UserCardProps {
  name: string;
  onSubmit: () => void;
  user: UserInfo;
  showButton: boolean;
}

const UserCard: FC<UserCardProps> = ({ name, onSubmit, user, showButton }) => {
  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <h1 className="md:text-8xl text-6xl text-stroke font-Jomhuria">
          {name}
        </h1>
        {showButton && (
          <button
            className="bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-full flex items-center shadow-md transition-all duration-100"
            onClick={handleSubmit}
          >
            <p className="text-base font-medium">Update</p>
            <PencilSquareIcon className="h-6 w-6 ml-3" />
          </button>
        )}
      </div>

      <div className="relative my-10 sm:mx-2 p-8 bg-gray-400 rounded-lg shadow-lg">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <h2 className="md:text-6xl text-5xl font-Jomhuria text-gray-900">
              Name
            </h2>
            <p className="text-xl text-gray-800 mt-2">{user.name}</p>
          </div>
          <div>
            <h2 className="md:text-6xl text-5xl font-Jomhuria text-gray-900">
              Email
            </h2>
            <p className="text-xl text-gray-800 mt-2">{user.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
