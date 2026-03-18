import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SummaryCards from "../components/SummaryCards";
import AddTransaction from "../components/AddTransaction";
import RecentTransactions from "../components/RecentTransactions";
import Charts from "../components/Charts";
import Sidebar from "../components/Sidebar";
import BudgetTracker from "../components/BudgetTracker";
import Reports from "../components/Reports";
import DarkModeToggle from "../components/DarkModeToggle";

const Dashboard = ({ transactions = [], setTransactions }) => {
  const [view, setView] = useState("monthly");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const now = new Date();

  useEffect(() => {
  const fetchTransactions = async () => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    try {
      const res = await fetch("http://localhost:5000/api/transactions", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // must have Bearer
        },
      });

      if (res.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        alert("Session expired. Please login again.");
        return navigate("/login");
      }

      if (!res.ok) throw new Error("Failed to fetch transactions");

      const data = await res.json();
      setTransactions(data || []);
    } catch (err) {
      console.error("Error fetching transactions:", err);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  fetchTransactions();
}, [setTransactions, navigate]);

  const filteredTransactions = (transactions || []).filter((t) => {
    const tDate = t.date ? new Date(t.date) : new Date();
    if (view === "monthly")
      return tDate.getMonth() === now.getMonth() && tDate.getFullYear() === now.getFullYear();
    if (view === "yearly") return tDate.getFullYear() === now.getFullYear();
    return true;
  });

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar />

      <div className="flex-1 max-w-6xl mx-auto p-6 space-y-6">
        {/* View Toggle */}
        
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setView("monthly")}
            className={`px-4 py-2 rounded-xl ${
              view === "monthly" ? "bg-purple-600 text-white" : "bg-gray-200"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setView("yearly")}
            className={`px-4 py-2 rounded-xl ${
              view === "yearly" ? "bg-purple-600 text-white" : "bg-gray-200"
            }`}
          >
            Yearly
          </button>
        </div>

        {loading ? (
          <p className="text-gray-500">Loading transactions...</p>
        ) : (
          <>
            <SummaryCards transactions={filteredTransactions} />
            <BudgetTracker transactions={filteredTransactions} />
            <Reports transactions={filteredTransactions} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AddTransaction
                transactions={transactions}
                setTransactions={setTransactions}
              />
              <RecentTransactions
                transactions={filteredTransactions}
                setTransactions={setTransactions}
              />
            </div>

            <Charts transactions={filteredTransactions} />
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;



















// import { useState, useEffect } from "react";
// import SummaryCards from "../components/SummaryCards";
// import AddTransaction from "../components/AddTransaction";
// import RecentTransactions from "../components/RecentTransactions";
// import Charts from "../components/Charts";
// import Sidebar from "../components/Sidebar";
// import BudgetTracker from "../components/BudgetTracker";
// import Reports from "../components/Reports";

// const Dashboard = ({ transactions = [], setTransactions }) => {
//   const [view, setView] = useState("monthly");
//   const [loading, setLoading] = useState(true);

//   const now = new Date();
//   const token = localStorage.getItem("token");

//   // ✅ Fetch transactions from backend
//   useEffect(() => {
//     const fetchTransactions = async () => {
//       try {
//         const res = await fetch("http://localhost:5000/api/transactions", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         if (!res.ok) throw new Error("Network response not ok");
//         const data = await res.json();
//         setTransactions(data || []);
//       } catch (err) {
//         console.error("Error fetching:", err);
//         setTransactions([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (token) fetchTransactions();
//     else setLoading(false);
//   }, [setTransactions, token]);

//   const filteredTransactions = (transactions || []).filter((t) => {
//     const tDate = t.date ? new Date(t.date) : new Date();
//     if (view === "monthly")
//       return tDate.getMonth() === now.getMonth() && tDate.getFullYear() === now.getFullYear();
//     if (view === "yearly") return tDate.getFullYear() === now.getFullYear();
//     return true;
//   });

//   return (
//     <div className="min-h-screen flex bg-gray-50">
//       <Sidebar />

//       <div className="flex-1 max-w-6xl mx-auto p-6 space-y-6">
//         {/* View Toggle */}
//         <div className="flex gap-4 mb-4">
//           <button
//             onClick={() => setView("monthly")}
//             className={`px-4 py-2 rounded-xl ${
//               view === "monthly" ? "bg-purple-600 text-white" : "bg-gray-200"
//             }`}
//           >
//             Monthly
//           </button>
//           <button
//             onClick={() => setView("yearly")}
//             className={`px-4 py-2 rounded-xl ${
//               view === "yearly" ? "bg-purple-600 text-white" : "bg-gray-200"
//             }`}
//           >
//             Yearly
//           </button>
//         </div>

//         {loading ? (
//           <p className="text-gray-500">Loading transactions...</p>
//         ) : (
//           <>
//             <SummaryCards transactions={filteredTransactions} />
//             <BudgetTracker transactions={filteredTransactions} />
//             <Reports transactions={filteredTransactions} />

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <AddTransaction transactions={transactions} setTransactions={setTransactions} />
//               <RecentTransactions transactions={filteredTransactions} setTransactions={setTransactions} />
//             </div>

//             <Charts transactions={filteredTransactions} />
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;



// import { useState, useEffect } from "react";
// import SummaryCards from "../components/SummaryCards";
// import AddTransaction from "../components/AddTransaction";
// import RecentTransactions from "../components/RecentTransactions";
// import Charts from "../components/Charts";
// import Sidebar from "../components/Sidebar";
// import BudgetTracker from "../components/BudgetTracker";
// import Reports from "../components/Reports";

// const Dashboard = ({ transactions = [], setTransactions }) => {
//   const [view, setView] = useState("monthly");
//   const [loading, setLoading] = useState(true);

//   const now = new Date();

//   // ✅ Fetch transactions from backend
//   useEffect(() => {
//     const fetchTransactions = async () => {
//       try {
//         const res = await fetch("http://localhost:5000/api/transactions");
//         if (!res.ok) throw new Error("Network response not ok");
//         const data = await res.json();
//         setTransactions(data || []); // default empty array
//       } catch (err) {
//         console.error("Error fetching:", err);
//         setTransactions([]); // ensure array even on error
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchTransactions();
//   }, [setTransactions]);

//   // ✅ Safe filtering
//   const filteredTransactions = (transactions || []).filter((t) => {
//     const tDate = t.date ? new Date(t.date) : new Date();
//     if (view === "monthly")
//       return tDate.getMonth() === now.getMonth() && tDate.getFullYear() === now.getFullYear();
//     if (view === "yearly") return tDate.getFullYear() === now.getFullYear();
//     return true;
//   });

//   return (
//     <div className="min-h-screen flex bg-gray-50">
//       <Sidebar />

//       <div className="flex-1 max-w-6xl mx-auto p-6 space-y-6">
//         {/* View Toggle */}
//         <div className="flex gap-4 mb-4">
//           <button
//             onClick={() => setView("monthly")}
//             className={`px-4 py-2 rounded-xl ${
//               view === "monthly" ? "bg-purple-600 text-white" : "bg-gray-200"
//             }`}
//           >
//             Monthly
//           </button>
//           <button
//             onClick={() => setView("yearly")}
//             className={`px-4 py-2 rounded-xl ${
//               view === "yearly" ? "bg-purple-600 text-white" : "bg-gray-200"
//             }`}
//           >
//             Yearly
//           </button>
//         </div>

//         {/* Show loading state */}
//         {loading ? (
//           <p className="text-gray-500">Loading transactions...</p>
//         ) : (
//           <>
//             <SummaryCards transactions={filteredTransactions} />
//             <BudgetTracker transactions={filteredTransactions} />
//             <Reports transactions={filteredTransactions} />

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <AddTransaction
//                 transactions={transactions}
//                 setTransactions={setTransactions}
//               />
//               <RecentTransactions
//                 transactions={filteredTransactions}
//                 setTransactions={setTransactions}
//               />
//             </div>

//             <Charts transactions={filteredTransactions} />
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;







// import { useEffect, useState } from "react";
// import axios from "axios";

// const Dashboard = () => {
//   const [transactions, setTransactions] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // ✅ Get logged user
//  const storedUser = localStorage.getItem("user");
// const user = storedUser ? JSON.parse(storedUser) : null;

//   // ✅ Fetch transactions
//   useEffect(() => {
//     fetchTransactions();
//   }, []);

//   const fetchTransactions = async () => {
//     try {
//       const res = await axios.get(
//         "http://localhost:5000/api/transactions",
//         {
//           params: { userId: user?.id }, // ✅ user-based data
//         }
//       );

//       setTransactions(res.data || []);
//     } catch (err) {
//       console.log(err);
//       setTransactions([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Prevent crash
//   if (loading) {
//     return <div className="p-6">Loading...</div>;
//   }

//   // ✅ Safe filtering
//   const foodTransactions = transactions.filter(
//     (t) => t.category === "Food"
//   );

//   const transportTransactions = transactions.filter(
//     (t) => t.category === "Transport"
//   );

//   const totalAmount = transactions.reduce(
//     (acc, curr) => acc + Number(curr.amount),
//     0
//   );

//   return (
//     <div className="p-6">

//       {/* ✅ Header */}
//       <h1 className="text-2xl font-bold mb-4">
//         Welcome, {user?.name || "User"}
//       </h1>

//       {/* ✅ Summary */}
//       <div className="grid grid-cols-3 gap-4 mb-6">

//         <div className="bg-white p-4 shadow rounded">
//           <h3>Total Transactions</h3>
//           <p className="text-xl font-bold">{transactions.length}</p>
//         </div>

//         <div className="bg-white p-4 shadow rounded">
//           <h3>Total Amount</h3>
//           <p className="text-xl font-bold">₹ {totalAmount}</p>
//         </div>

//         <div className="bg-white p-4 shadow rounded">
//           <h3>Food</h3>
//           <p className="text-xl font-bold">
//             {foodTransactions.length}
//           </p>
//         </div>

//       </div>

//       {/* ✅ Transactions List */}
//       <div className="bg-white p-4 shadow rounded">
//         <h2 className="text-xl font-bold mb-3">
//           Recent Transactions
//         </h2>

//         {transactions.length === 0 ? (
//           <p>No transactions found</p>
//         ) : (
//           <ul>
//             {transactions.map((t) => (
//               <li
//                 key={t._id}
//                 className="flex justify-between border-b py-2"
//               >
//                 <span>{t.title}</span>
//                 <span>₹ {t.amount}</span>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//     </div>
//   );
// };

// export default Dashboard;



























// import { useState, useEffect } from "react";
// import SummaryCards from "../components/SummaryCards";
// import AddTransaction from "../components/AddTransaction";
// import RecentTransactions from "../components/RecentTransactions";
// import Charts from "../components/Charts";
// import Sidebar from "../components/Sidebar";
// import BudgetTracker from "../components/BudgetTracker";
// import Reports from "../components/Reports";




// const Dashboard = ({ transactions, setTransactions }) => {
//   const [view, setView] = useState("monthly");
//   const [loading, setLoading] = useState(true);

//   const now = new Date();

//   // ✅ Fetch transactions from backend
//   useEffect(() => {
//     const fetchTransactions = async () => {
//       try {
//         const res = await fetch("http://localhost:5000/api/transactions");
//         if (!res.ok) throw new Error("Network response not ok");
//         const data = await res.json();
//         setTransactions(data);
//       } catch (err) {
//         console.error("Error fetching:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchTransactions();
//   }, [setTransactions]);

//   const filteredTransactions = transactions.filter((t) => {
//     const tDate = t.date ? new Date(t.date) : new Date();
//     if (view === "monthly")
//       return tDate.getMonth() === now.getMonth() && tDate.getFullYear() === now.getFullYear();
//     if (view === "yearly") return tDate.getFullYear() === now.getFullYear();
//     return true;
//   });

//   return (
//     <div className="min-h-screen flex bg-gray-50">
//       <Sidebar />

//       <div className="flex-1 max-w-6xl mx-auto p-6 space-y-6">
//         {/* View Toggle */}
//         <div className="flex gap-4 mb-4">
//           <button
//             onClick={() => setView("monthly")}
//             className={`px-4 py-2 rounded-xl ${
//               view === "monthly" ? "bg-purple-600 text-white" : "bg-gray-200"
//             }`}
//           >
//             Monthly
//           </button>
//           <button
//             onClick={() => setView("yearly")}
//             className={`px-4 py-2 rounded-xl ${
//               view === "yearly" ? "bg-purple-600 text-white" : "bg-gray-200"
//             }`}
//           >
//             Yearly
//           </button>
//         </div>

//         {/* Show loading state */}
//         {loading ? (
//           <p className="text-gray-500">Loading transactions...</p>
//         ) : (
//           <>
//             {/* Summary */}
//             <SummaryCards transactions={filteredTransactions} />

//             {/* Budget Tracker */}
//             <BudgetTracker transactions={filteredTransactions} />

//             {/* Reports */}
//             <Reports transactions={filteredTransactions} />

//             {/* Form + Recent Transactions */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <AddTransaction
//                 transactions={transactions}
//                 setTransactions={setTransactions}
//               />
//               <RecentTransactions
//                 transactions={filteredTransactions}
//                 setTransactions={setTransactions}
//               />
//             </div>

//             {/* Charts */}
//             <Charts transactions={filteredTransactions} />
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;































// import { useState, useEffect } from "react";
// import SummaryCards from "../components/SummaryCards";
// import AddTransaction from "../components/AddTransaction";
// import RecentTransactions from "../components/RecentTransactions";
// import Charts from "../components/Charts";
// import Sidebar from "../components/Sidebar";
// import BudgetTracker from "../components/BudgetTracker";
// import Reports from "../components/Reports"; // ✅ Import the Reports component

// const Dashboard = ({ transactions, setTransactions }) => {
//   const [view, setView] = useState("monthly");

//   const now = new Date();
//   useEffect(() => {
//   fetch("http://localhost:5000/api/transactions")
//     .then((res) => res.json())
//     .then((data) => {
//       setTransactions(data);
//     })
//     .catch((err) => console.error(err));
// }, []);

//   const filteredTransactions = transactions.filter((t) => {
//     const tDate = t.date ? new Date(t.date) : new Date();

//     if (view === "monthly") {
//       return (
//         tDate.getMonth() === now.getMonth() &&
//         tDate.getFullYear() === now.getFullYear()
//       );
//     }

//     if (view === "yearly") {
//       return tDate.getFullYear() === now.getFullYear();
//     }

//     return true;
//   });

//   return (
//     <div className="min-h-screen flex"> {/* removed bg-gray-100 */ }
//       <Sidebar />

//       <div className="flex-1 max-w-6xl mx-auto p-6 space-y-6">

//         {/* Toggle */}
//         <div className="flex gap-4">
//           <button
//             onClick={() => setView("monthly")}
//             className={`px-4 py-2 rounded ${
//               view === "monthly" ? "bg-purple-600 text-white" : "bg-gray-200"
//             }`}
//           >
//             Monthly
//           </button>

//           <button
//             onClick={() => setView("yearly")}
//             className={`px-4 py-2 rounded ${
//               view === "yearly" ? "bg-purple-600 text-white" : "bg-gray-200"
//             }`}
//           >
//             Yearly
//           </button>
//         </div>

//         {/* Summary */}
//         <SummaryCards transactions={filteredTransactions} />

//         {/* Budget Tracker */}
//         <BudgetTracker transactions={filteredTransactions} />

//         {/* Reports */}
//         <Reports transactions={filteredTransactions} /> {/* ✅ Added Reports here */}

//         {/* Form + Recent Transactions */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <AddTransaction
//             transactions={transactions}
//             setTransactions={setTransactions}
//           />
//           <RecentTransactions
//             transactions={filteredTransactions}
//             setTransactions={setTransactions}
//           />
//         </div>

//         {/* Charts */}
//         <Charts transactions={filteredTransactions} />

//       </div>
//     </div>
//   );
// };

// export default Dashboard;

