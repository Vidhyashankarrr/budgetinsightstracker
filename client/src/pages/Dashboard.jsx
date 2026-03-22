import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import SummaryCards from "../components/SummaryCards";
import AddTransaction from "../components/AddTransaction";
import RecentTransactions from "../components/RecentTransactions";
import Charts from "../components/Charts";
import Sidebar from "../components/Sidebar";
import BudgetTracker from "../components/BudgetTracker";
import Reports from "../components/Reports";
import axiosInstance from "../axios/axios";

const Dashboard = ({ transactions = [], setTransactions }) => {
  const [view, setView] = useState("monthly");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const now = new Date();

  useEffect(() => {
    const fetchTransactions = async () => {
      const token = localStorage.getItem("token");
      if (!token) { navigate("/login"); return; }
      try {
        const res = await axiosInstance.get("/transactions");
        setTransactions(res.data || []);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } finally { setLoading(false); }
    };
    fetchTransactions();
  }, [setTransactions, navigate]);

  const filteredTransactions = (transactions || []).filter((t) => {
    const tDate = t.date ? new Date(t.date) : new Date();
    if (view === "monthly") return tDate.getMonth() === now.getMonth() && tDate.getFullYear() === now.getFullYear();
    if (view === "yearly") return tDate.getFullYear() === now.getFullYear();
    return true;
  });

  return (
    /* THE BACKGROUND: 
       I've used a subtle blue-ish slate base (#f1f5f9) 
       and added two massive "blobs" of color that stay fixed.
    */
    <div className="min-h-screen flex relative bg-[#f1f5f9] overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="fixed top-0 right-0 w-[50vw] h-[50vw] bg-purple-200/40 rounded-full blur-[120px] -z-10 translate-x-1/4 -translate-y-1/4"></div>
      <div className="fixed bottom-0 left-0 w-[40vw] h-[40vw] bg-indigo-200/40 rounded-full blur-[100px] -z-10 -translate-x-1/4 translate-y-1/4"></div>

      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto relative z-10">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* View Toggle */}
          <div className="flex gap-4">
            <button
              onClick={() => setView("monthly")}
              className={`px-6 py-2 rounded-xl font-bold transition-all ${
                view === "monthly"
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-200"
                  : "bg-white text-gray-400 hover:text-purple-600"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setView("yearly")}
              className={`px-6 py-2 rounded-xl font-bold transition-all ${
                view === "yearly"
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-200"
                  : "bg-white text-gray-400 hover:text-purple-600"
              }`}
            >
              Yearly
            </button>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            </div>
          ) : (
            <>
              <SummaryCards transactions={filteredTransactions} />
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  <BudgetTracker transactions={filteredTransactions} />
                  <Reports transactions={filteredTransactions} />
                  <Charts transactions={filteredTransactions} />
                </div>
                
                <div className="space-y-8">
                  <AddTransaction transactions={transactions} setTransactions={setTransactions} />
                  <RecentTransactions transactions={filteredTransactions} setTransactions={setTransactions} />
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;










// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";


// import SummaryCards from "../components/SummaryCards";
// import AddTransaction from "../components/AddTransaction";
// import RecentTransactions from "../components/RecentTransactions";
// import Charts from "../components/Charts";
// import Sidebar from "../components/Sidebar";
// import BudgetTracker from "../components/BudgetTracker";
// import Reports from "../components/Reports";
// import axiosInstance from "../axios/axios";

// const Dashboard = ({ transactions = [], setTransactions }) => {
//   const [view, setView] = useState("monthly");
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const now = new Date();

//   useEffect(() => {
//     const fetchTransactions = async () => {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         navigate("/login");
//         return;
//       }

//       try {
//         const res = await axiosInstance.get("/transactions");
//         setTransactions(res.data || []);
//       } catch (err) {
//         console.error("Error fetching transactions:", err);

//         if (err.response && err.response.status === 401) {
//           localStorage.removeItem("token");
//           localStorage.removeItem("user");
//           alert("Session expired. Please login again.");
//           navigate("/login");
//         } else {
//           setTransactions([]);
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTransactions();
//   }, [setTransactions, navigate]);

//   const filteredTransactions = (transactions || []).filter((t) => {
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
//   <div className="min-h-screen flex bg-[radial-gradient(circle_at_top_left,_#e0e7ff,_#f8fafc,_#f3e8ff)]">
    
   
    
//     {/*  Background Glow (non-intrusive) */}
//     <div className="pointer-events-none absolute top-0 left-0 w-72 h-72 bg-purple-300 rounded-full blur-3xl opacity-20"></div>
//     <div className="pointer-events-none absolute bottom-0 right-0 w-72 h-72 bg-indigo-300 rounded-full blur-3xl opacity-20"></div>

//     <Sidebar />

//     <div className="flex-1 max-w-6xl mx-auto p-6 space-y-6">
      
//       {/* View Toggle */}
//       <div className="flex gap-4 mb-4">
//         <button
//           onClick={() => setView("monthly")}
//           className={`px-4 py-2 rounded-xl ${
//             view === "monthly"
//               ? "bg-purple-600 text-white"
//               : "bg-gray-200"
//           }`}
//         >
//           Monthly
//         </button>

//         <button
//           onClick={() => setView("yearly")}
//           className={`px-4 py-2 rounded-xl ${
//             view === "yearly"
//               ? "bg-purple-600 text-white"
//               : "bg-gray-200"
//           }`}
//         >
//           Yearly
//         </button>
//       </div>

//       {loading ? (
//         <p className="text-gray-500">Loading transactions...</p>
//       ) : (
//         <>
//           <SummaryCards transactions={filteredTransactions} />
//           <BudgetTracker transactions={filteredTransactions} />
//           <Reports transactions={filteredTransactions} />

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <AddTransaction
//               transactions={transactions}
//               setTransactions={setTransactions}
//             />

//             <RecentTransactions
//               transactions={filteredTransactions}
//               setTransactions={setTransactions}
//             />
//           </div>

//           <Charts transactions={filteredTransactions} />
//         </>
//       )}
//     </div>
//   </div>
// );
// };

// export default Dashboard;
























  // return (
  //   // <div className="min-h-screen flex bg-gray-50">
  //     <div className="min-h-screen flex bg-gradient-to-br from-[#eef2ff] via-[#f8fafc] to-[#f3e8ff]">
  //     <Sidebar />

  //     <div className="flex-1 max-w-6xl mx-auto p-6 space-y-6">
  //       {/* View Toggle */}
  //       <div className="flex gap-4 mb-4">
  //         <button
  //           onClick={() => setView("monthly")}
  //           className={`px-4 py-2 rounded-xl ${
  //             view === "monthly"
  //               ? "bg-purple-600 text-white"
  //               : "bg-gray-200"
  //           }`}
  //         >
  //           Monthly
  //         </button>

  //         <button
  //           onClick={() => setView("yearly")}
  //           className={`px-4 py-2 rounded-xl ${
  //             view === "yearly"
  //               ? "bg-purple-600 text-white"
  //               : "bg-gray-200"
  //           }`}
  //         >
  //           Yearly
  //         </button>
  //       </div>

  //       {loading ? (
  //         <p className="text-gray-500">Loading transactions...</p>
  //       ) : (
  //         <>
  //           <SummaryCards transactions={filteredTransactions} />
  //           <BudgetTracker transactions={filteredTransactions} />
  //           <Reports transactions={filteredTransactions} />

  //           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  //             <AddTransaction
  //               transactions={transactions}
  //               setTransactions={setTransactions}
  //             />

  //             <RecentTransactions
  //               transactions={filteredTransactions}
  //               setTransactions={setTransactions}
  //             />
  //           </div>

  //           <Charts transactions={filteredTransactions} />
  //         </>
  //       )}
  //     </div>
  //   </div>
  // );



// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import SummaryCards from "../components/SummaryCards";
// import AddTransaction from "../components/AddTransaction";
// import RecentTransactions from "../components/RecentTransactions";
// import Charts from "../components/Charts";
// import Sidebar from "../components/Sidebar";
// import BudgetTracker from "../components/BudgetTracker";
// import Reports from "../components/Reports";
// // import DarkModeToggle from "../components/DarkModeToggle";

// const Dashboard = ({ transactions = [], setTransactions }) => {
//   const [view, setView] = useState("monthly");
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const now = new Date();

//   useEffect(() => {
//   const fetchTransactions = async () => {
//     const token = localStorage.getItem("token");
//     if (!token) return navigate("/login");

//     try {
//       const res = await fetch("http://localhost:5000/api/transactions", {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`, // must have Bearer
//         },
//       });

//       if (res.status === 401) {
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//         alert("Session expired. Please login again.");
//         return navigate("/login");
//       }

//       if (!res.ok) throw new Error("Failed to fetch transactions");

//       const data = await res.json();
//       setTransactions(data || []);
//     } catch (err) {
//       console.error("Error fetching transactions:", err);
//       setTransactions([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchTransactions();
// }, [setTransactions, navigate]);

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


















