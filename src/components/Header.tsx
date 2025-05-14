import { FC } from "react";
import { logoURL } from "../assets/Images";
import { Link, useNavigate } from "react-router-dom";

const Header: FC = () => {
  const navigate = useNavigate();

  const isAuthenticated = !!sessionStorage.getItem("token");

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("nickname");
    navigate("/");
  };

  return (
    <header className="flex bg-red-700 justify-between items-center pt-1">
      <button onClick={() => navigate("/home")}>
        <div className="flex items-center">
          <img src={logoURL} className="m-3 w-20 h-8"></img>
          <div className="border border-black h-12 w-1 bg-white mr-2"></div>
          <h1 className="md:text-6xl text-5xl text-stroke font-Jomhuria">
            Training and Judge Center
          </h1>
        </div>
      </button>
      {isAuthenticated && (
        <div className="flex px-5 md:text-6xl text-5xl text-stroke font-Jomhuria gap-8">
          <Link to="/users/">Users</Link>
          <Link to="/profile/">Profile</Link>

          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </header>
  );
};

export default Header;
