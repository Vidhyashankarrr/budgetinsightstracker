import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// Install lucide-react if you haven't: npm install lucide-react
import { 
  LayoutDashboard, 
  ArrowDownCircle, 
  ArrowUpCircle, 
  LogOut, 
  UserCircle,
  Settings
} from "lucide-react";

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
    { name: "Dashboard", path: "/", icon: <LayoutDashboard size={20} /> },
    { name: "Income", path: "/income", icon: <ArrowDownCircle size={20} /> },
    { name: "Expense", path: "/expense", icon: <ArrowUpCircle size={20} /> },
  ];

  return (
    <div className="w-64 min-h-screen bg-[#0f172a] text-white flex flex-col p-6 shadow-2xl relative z-30 border-r border-white/5 font-sans">
      
      {/* Brand Logo */}
      <div 
        className="flex items-center gap-3 mb-10 px-2 cursor-pointer group" 
        onClick={() => navigate("/")}
      >
        <div className="w-10 h-10 bg-gradient-to-tr from-indigo-500 via-purple-500 to-fuchsia-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform duration-300">
          <span className="text-xl font-black italic">B</span>
        </div>
        <h2 className="text-xl font-black tracking-tight bg-clip-text bg-gradient-to-r from-white to-gray-400 text-transparent">
          Budget Buddy
        </h2>
      </div>

      {/* --- REFINED PROFILE SECTION --- */}
      <div className="mb-10 px-2">
        <div className="flex items-center gap-4 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm relative group cursor-pointer hover:bg-white/10 transition-all" onClick={() => navigate("/profile")}>
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center text-lg font-bold shadow-md border border-white/20">
              {user?.name ? user.name[0].toUpperCase() : <UserCircle size={24} />}
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-[#0f172a] rounded-full"></div>
          </div>
          
          <div className="flex-1 min-w-0">
            <p className="text-[10px] text-indigo-300 font-bold uppercase tracking-widest opacity-70">Welcome,</p>
            <h3 className="font-bold text-sm truncate text-white uppercase tracking-wide">
              {user?.name || "Guest"}
            </h3>
          </div>

          <Settings size={14} className="text-gray-500 group-hover:text-white group-hover:rotate-90 transition-all duration-500" />
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex flex-col gap-1.5 flex-1">
        <p className="px-4 text-[10px] uppercase tracking-[0.2em] text-gray-500 font-black mb-2 opacity-50">
          Main Menu
        </p>
        
        {menu.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`group flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 relative ${
                isActive
                  ? "bg-gradient-to-r from-indigo-600/20 to-purple-600/20 text-white border border-indigo-500/30 shadow-[0_0_20px_rgba(79,70,229,0.1)]"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {/* Icon Container */}
              <div className={`p-2 rounded-xl transition-all duration-300 ${
                isActive 
                ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/40 scale-110" 
                : "bg-white/5 text-gray-500 group-hover:text-indigo-400 group-hover:bg-indigo-500/10"
              }`}>
                {item.icon}
              </div>

              <span className={`font-bold text-sm tracking-wide transition-all ${isActive ? "translate-x-1" : "group-hover:translate-x-1"}`}>
                {item.name}
              </span>

              {/* Active Indicator Pin */}
              {isActive && (
                <div className="absolute right-4 w-1.5 h-1.5 bg-indigo-400 rounded-full shadow-[0_0_8px_rgba(129,140,248,0.8)]"></div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Logout Area */}
      <div className="pt-6 mt-4 border-t border-white/5">
        <button
          onClick={handleLogout}
          className="w-full group flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 text-gray-500 hover:bg-red-500/10 hover:text-red-400 font-bold text-sm"
        >
          <div className="p-2 rounded-xl bg-white/5 group-hover:bg-red-500/20 transition-all">
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
          </div>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

// import { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";

// const Sidebar = () => {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser && storedUser !== "undefined") {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   const menu = [
//     { name: "Dashboard", path: "/" },
//     { name: "Income", path: "/income" },
//     { name: "Expense", path: "/expense" },
//   ];

//   return (
//     <div className="w-64 min-h-screen bg-gradient-to-b from-purple-600 to-indigo-600 text-white flex flex-col p-5">
      
//       {/* Logo */}
//       <h2 className="text-xl font-bold mb-6">Budget Buddy</h2>

//       {/* User */}
//       <div className="mb-6">
//         <p className="text-sm opacity-80">Welcome</p>
//         <h3 className="font-semibold">{user?.name || "Guest"}</h3>
//       </div>

//       {/* Menu */}
//       <div className="flex flex-col gap-3">
//         {menu.map((item) => (
//           <button
//             key={item.path}
//             onClick={() => navigate(item.path)}
//             className={`text-left px-4 py-2 rounded-lg transition ${
//               location.pathname === item.path
//                 ? "bg-white text-purple-600"
//                 : "hover:bg-purple-500"
//             }`}
//           >
//             {item.name}
//           </button>
//         ))}
//       </div>

//       {/* Logout
//       <button
//         onClick={handleLogout}
//         className="mt-auto text-red-300 hover:text-red-500 "
//       >
//         Logout
//       </button> */}
//       <button
//   onClick={handleLogout}
//   className="mt-auto text-left px-4 py-2 rounded-lg transition hover:bg-purple-500"
// >
//   Logout
// </button>
//     </div>
//   );
// };

// export default Sidebar;



