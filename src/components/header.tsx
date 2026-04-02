import { useNavigate } from "react-router-dom";
import { useAppStore } from "../store";

const Header = () => {
  const user = useAppStore((state) => state.user);
  const logout = useAppStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    localStorage.removeItem("auth-storage");
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">E</span>
          </div>
          <span className="text-xl font-bold text-gray-800 hidden sm:block">
            Employee App
          </span>
        </div>

        {user && (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-gray-800 leading-tight">
                  {user.name}
                </p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
              <img
                src={
                  user.picture ||
                  "https://ui-avatars.com/api/?name=" + user.name
                }
                alt={user.name}
                className="w-10 h-10 rounded-full border-2 border-gray-200"
              />
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition duration-200"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
