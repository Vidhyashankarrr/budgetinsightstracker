import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaSignOutAlt,
  FaArrowCircleUp,
  FaArrowCircleDown,
} from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ SAFE PARSE
  let user = null;
  try {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      user = JSON.parse(storedUser);
    }
  } catch {
    user = null;
  }

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const menuItems = [
    { name: "Dashboard", path: "/", icon: <FaTachometerAlt /> },
    { name: "Income", path: "/income", icon: <FaArrowCircleUp /> },
    { name: "Expense", path: "/expense", icon: <FaArrowCircleDown /> },
  ];

  return (
    <div className="w-64 bg-white shadow-lg min-h-screen flex flex-col justify-between">

      <div>
        {/* LOGO */}
        <div className="p-6">
          <h1 className="text-2xl font-bold text-purple-600">
            Budget Buddy
          </h1>
        </div>

        {/* PROFILE */}
        <div className="px-6 mb-4 flex items-center gap-3">
          <img
            src={user?.profilePic || "https://via.placeholder.com/40"}
            alt="profile"
            className="w-10 h-10 rounded-full"
          />
          <span>{user?.name || "Guest"}</span>
        </div>

        {/* MENU */}
        <nav className="flex flex-col gap-2 px-4">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`p-3 rounded-xl ${
                location.pathname === item.path
                  ? "bg-purple-600 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {item.icon} {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* LOGOUT */}
      <div className="p-4">
        <button
          onClick={handleLogout}
          className="text-red-500"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;





































// import { Link, useLocation, useNavigate } from "react-router-dom";
// import {
//   FaTachometerAlt,
//   FaSignOutAlt,
//   FaArrowCircleUp,
//   FaArrowCircleDown,
// } from "react-icons/fa";

// const Sidebar = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   // const user = JSON.parse(localStorage.getItem("user"));
//   // const user = JSON.parse(localStorage.getItem("user") || "null");
// let user = null;

// try {
//   const storedUser = localStorage.getItem("user");

//   if (storedUser && storedUser !== "undefined") {
//     user = JSON.parse(storedUser);
//   }
// } catch (error) {
//   user = null;
// }
//   const menuItems = [
//     { name: "Dashboard", path: "/", icon: <FaTachometerAlt /> },
//     { name: "Income", path: "/income", icon: <FaArrowCircleUp /> },
//     { name: "Expense", path: "/expense", icon: <FaArrowCircleDown /> },
//   ];

//   const activeClass =
//     "flex items-center gap-3 p-3 bg-purple-600 text-white rounded-xl transition-all";
//   const normalClass =
//     "flex items-center gap-3 p-3 hover:bg-gray-100 rounded-xl transition-all";

//   // 🔥 FIXED LOGOUT
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");

//     navigate("/login");
//   };

//   return (
//     <div className="w-64 bg-white shadow-lg min-h-screen flex flex-col justify-between">

//       {/* TOP */}
//       <div>
//         {/* Logo */}
//         <div className="p-6">
//           <h1 className="text-2xl font-bold text-purple-600">
//             Budget Buddy
//           </h1>
//         </div>

//         {/* 👤 USER PROFILE */}
//         <div className="px-6 mb-4 flex items-center gap-3">
//           <div className="w-10 h-10 bg-purple-600 text-white flex items-center justify-center rounded-full">
//             {user?.name?.charAt(0)}
//           </div>
//           <span className="font-medium text-gray-700">
//             {user?.name}
//           </span>
//         </div>

//         {/* MENU */}
//         <nav className="flex flex-col gap-2 px-4">
//           {menuItems.map((item) => (
//             <Link
//               key={item.name}
//               to={item.path}
//               className={
//                 location.pathname === item.path
//                   ? activeClass
//                   : normalClass
//               }
//             >
//               {item.icon}
//               <span className="font-medium">{item.name}</span>
//             </Link>
//           ))}
//         </nav>
//       </div>

//       {/* 🔥 LOGOUT */}
//       <div className="p-4">
//         <button
//           onClick={handleLogout}
//           className="flex items-center gap-3 p-3 text-red-500 hover:bg-red-50 rounded-xl w-full transition-all"
//         >
//           <FaSignOutAlt />
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;




// import { Link, useLocation } from "react-router-dom";

// const Sidebar = () => {
//   const location = useLocation();

//   const activeClass = "block p-2 bg-purple-600 text-white rounded";
//   const normalClass = "block p-2 hover:bg-gray-100 rounded";

//   return (
//     <div className="w-60 bg-white min-h-screen p-4">
//       <h2 className="font-bold text-xl mb-6">Expense Tracker</h2>

//       <nav className="space-y-3">
//         <Link
//           to="/"
//           className={location.pathname === "/" ? activeClass : normalClass}
//         >
//           Dashboard
//         </Link>

//         <Link
//           to="/income"
//           className={location.pathname === "/income" ? activeClass : normalClass}
//         >
//           Income
//         </Link>

//         <Link
//           to="/expense"
//           className={location.pathname === "/expense" ? activeClass : normalClass}
//         >
//           Expense
//         </Link>

//         {/* Logout aligned like others */}
//         <button
//           onClick={() => {
//             localStorage.removeItem("isLoggedIn");
//             window.location.reload();
//           }}
//           className="block w-full p-2 text-left text-red-500 hover:bg-red-50 rounded mt-6"
//         >
//           Logout
//         </button>
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;

