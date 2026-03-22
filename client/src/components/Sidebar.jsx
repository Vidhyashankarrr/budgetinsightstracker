import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const menu = [
    { name: "Dashboard", path: "/" },
    { name: "Income", path: "/income" },
    { name: "Expense", path: "/expense" },
  ];

  return (
    <div className="w-64 min-h-screen bg-gradient-to-b from-purple-600 to-indigo-600 text-white flex flex-col p-5">
      
      {/* Logo */}
      <h2 className="text-xl font-bold mb-6">Budget Buddy</h2>

      {/* User */}
      <div className="mb-6">
        <p className="text-sm opacity-80">Welcome</p>
        <h3 className="font-semibold">{user?.name || "Guest"}</h3>
      </div>

      {/* Menu */}
      <div className="flex flex-col gap-3">
        {menu.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`text-left px-4 py-2 rounded-lg transition ${
              location.pathname === item.path
                ? "bg-white text-purple-600"
                : "hover:bg-purple-500"
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>

      {/* Logout
      <button
        onClick={handleLogout}
        className="mt-auto text-red-300 hover:text-red-500 "
      >
        Logout
      </button> */}
      <button
  onClick={handleLogout}
  className="mt-auto text-left px-4 py-2 rounded-lg transition hover:bg-purple-500"
>
  Logout
</button>
    </div>
  );
};

export default Sidebar;



