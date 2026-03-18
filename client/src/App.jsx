// import { useState, useEffect } from "react";
// import { Routes, Route, Navigate } from "react-router-dom";

// import Dashboard from "./Pages/Dashboard";
// import Income from "./Pages/income";
// import Expense from "./Pages/Expense";
// import Login from "./Pages/Login";
// import Signup from "./Pages/Signup";

// // 🔥 Protected Route (USE TOKEN, NOT isLoggedIn)
// const ProtectedRoute = ({ children }) => {
//   const token = localStorage.getItem("token");

//   return token ? children : <Navigate to="/login" replace />;
// };



// function App() {
//   const [transactions, setTransactions] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await fetch("http://localhost:5000/api/transactions");
//         const data = await res.json();
//         setTransactions(data);
//       } catch (err) {
//         console.error("Error fetching:", err);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-purple-100 via-purple-50 to-white">
//       <Routes>
//         {/* Public */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />

//         {/* Protected */}
//         <Route
//           path="/"
//           element={
//             <ProtectedRoute>
//               <Dashboard transactions={transactions} setTransactions={setTransactions} />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/income"
//           element={
//             <ProtectedRoute>
//               <Income transactions={transactions} setTransactions={setTransactions} />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/expense"
//           element={
//             <ProtectedRoute>
//               <Expense transactions={transactions} setTransactions={setTransactions} />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </div>
//   );
// }
  
// export default App;


// 
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import Income from "./pages/Income.jsx";
import Expense from "./pages/Expense.jsx";
import { useState } from "react";


function App() {
  const isLoggedIn = localStorage.getItem("token");

  const [transactions, setTransactions] = useState([]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route
        path="/"
        element={
          isLoggedIn ? (
            <Dashboard
              transactions={transactions}
              setTransactions={setTransactions}
            />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      <Route
        path="/income"
        element={
          <Income
            transactions={transactions}
            setTransactions={setTransactions}
          />
        }
      />

      <Route
        path="/expense"
        element={
          <Expense
            transactions={transactions}
            setTransactions={setTransactions}
          />
        }
      />
    </Routes>
  );
}

export default App;