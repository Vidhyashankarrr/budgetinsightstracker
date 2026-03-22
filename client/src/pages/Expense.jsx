import { useState } from "react";
import axiosInstance from "../axios/axios";
import AddTransaction from "../components/AddTransaction";

const Expense = ({ transactions = [], setTransactions }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [sortBy, setSortBy] = useState("latest");

  // 1. Get only Expense transactions
  const expenseTransactions = (transactions || []).filter(
    (t) => t.type === "expense"
  );

  // 2. Apply Search, Filter, and Sort Logic
  const filteredExpenses = expenseTransactions
    .filter((t) => {
      const matchesSearch = t.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === "All" || t.category === filterCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "latest") return new Date(b.date) - new Date(a.date);
      if (sortBy === "oldest") return new Date(a.date) - new Date(b.date);
      if (sortBy === "high") return b.amount - a.amount;
      if (sortBy === "low") return a.amount - b.amount;
      return 0;
    });

  // Unique categories for the dropdown filter
  const categories = ["All", ...new Set(expenseTransactions.map((t) => t.category))];

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this expense?")) return;
    try {
      await axiosInstance.delete(`/transactions/${id}`);
      setTransactions((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      if (err.response && err.response.status === 401) {
        localStorage.clear();
        window.location.href = "/login";
      } else {
        alert("Failed to delete expense");
      }
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#f8fafc] p-4 md:p-8">
      
      {/* --- PREMIUM BACKGROUND GLOWS (Red/Purple Theme) --- */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-red-100/40 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-100/40 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-purple-700">
              My Expenses
            </h2>
            <p className="text-gray-500 mt-1 font-medium">Keep track of your spending</p>
          </div>
          <div className="bg-red-500 px-6 py-3 rounded-2xl shadow-lg shadow-red-100 text-white">
             <span className="text-xs uppercase opacity-80 block font-bold">Total Spent</span>
             <span className="text-2xl font-bold">
               ₹{filteredExpenses.reduce((acc, curr) => acc + curr.amount, 0).toLocaleString('en-IN')}
             </span>
          </div>
        </div>

        {/* Add Transaction Section */}
        <div className="mb-10 transform transition hover:scale-[1.01]">
          <AddTransaction
            setTransactions={setTransactions}
            fixedType="expense"
          />
        </div>

        {/* --- SEARCH & FILTER BAR --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="relative">
             <input
                type="text"
                placeholder="Search category..."
                className="w-full px-5 py-3 rounded-2xl border-none bg-white shadow-sm focus:ring-2 focus:ring-red-400 text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
          </div>
          <select
            className="px-5 py-3 rounded-2xl border-none bg-white shadow-sm focus:ring-2 focus:ring-red-400 text-sm text-gray-500 outline-none"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select
            className="px-5 py-3 rounded-2xl border-none bg-white shadow-sm focus:ring-2 focus:ring-red-400 text-sm text-gray-500 outline-none"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="latest">Latest First</option>
            <option value="high">Highest Amount</option>
            <option value="low">Lowest Amount</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>

        {/* Transactions List Container (The UI you liked) */}
        <div className="bg-white/70 backdrop-blur-xl rounded-[2rem] shadow-xl shadow-gray-200/50 border border-white overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white/50">
            <h3 className="font-bold text-gray-800">Expense History</h3>
            <span className="text-sm text-red-600 font-semibold bg-red-50 px-3 py-1 rounded-lg">
              {filteredExpenses.length} Transactions
            </span>
          </div>

          <div className="divide-y divide-gray-50">
            {filteredExpenses.length === 0 ? (
              <div className="py-20 text-center text-gray-400 italic font-medium">
                No expense records found.
              </div>
            ) : (
              filteredExpenses.map((t) => (
                <div
                  key={t._id}
                  className="group flex items-center justify-between p-5 hover:bg-red-50/30 transition-all"
                >
                  <div className="flex items-center gap-4">
                    {/* Calendar Date Icon Box */}
                    <div className="flex flex-col items-center justify-center w-14 h-14 bg-white border border-gray-100 rounded-2xl shadow-sm group-hover:border-red-200 transition-colors">
                      <span className="text-[10px] uppercase text-gray-400 font-bold">
                        {t.date ? new Date(t.date).toLocaleString('en-IN', { month: 'short' }) : '—'}
                      </span>
                      <span className="text-lg font-bold text-gray-700 leading-none">
                        {t.date ? new Date(t.date).getDate() : '—'}
                      </span>
                    </div>

                    <div>
                      <p className="font-bold text-gray-800 group-hover:text-red-700 transition-colors">
                        {t.category}
                      </p>
                      <p className="text-[10px] text-gray-400 font-medium bg-gray-100 px-2 py-0.5 rounded-md inline-block mt-1">
                        Debit
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <span className="text-xl font-black text-red-600">
                      -₹{t.amount.toLocaleString('en-IN')}
                    </span>
                    
                    <button
                      onClick={() => handleDelete(t._id)}
                      className="p-2.5 rounded-xl text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
                      title="Delete Entry"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expense;











// import axiosInstance from "../axios/axios";
// import AddTransaction from "../components/AddTransaction";


// const Expense = ({ transactions = [], setTransactions }) => {
//   const expenseTransactions = (transactions || []).filter(
//     (t) => t.type === "expense"
//   );

//   const handleDelete = async (id) => {
//     try {
//       // axios instance (token auto added)
//       await axiosInstance.delete(`/transactions/${id}`);

//       setTransactions((prev) => prev.filter((t) => t._id !== id));
//     } catch (err) {
//       console.error(err);

//       if (err.response && err.response.status === 401) {
//         localStorage.clear();
//         alert("Session expired. Please login again.");
//         window.location.href = "/login";
//       } else {
//         alert("Failed to delete expense");
//       }
//     }
//   };

//   const total = expenseTransactions.reduce((sum, t) => sum + t.amount, 0);

//   const highest = expenseTransactions.length
//     ? Math.max(...expenseTransactions.map((t) => t.amount))
//     : 0;

//   const getCategoryStyle = (category) => {
//     switch (category) {
//       case "Food":
//         return "bg-orange-100 text-orange-600";
//       case "Transport":
//         return "bg-blue-100 text-blue-600";
//       case "Shopping":
//         return "bg-purple-100 text-purple-600";
//       case "Rent":
//         return "bg-green-100 text-green-600";
//       case "Utilities":
//         return "bg-yellow-100 text-yellow-600";
//       default:
//         return "bg-gray-100 text-gray-600";
//     }
//   };

//   return (
//     <div className="min-h-screen p-6 bg-gray-50">
//       <h2 className="text-3xl font-bold mb-6 text-purple-700">
//         My Expenses
//       </h2>

//       <div className="mb-8">
//         <AddTransaction
//           setTransactions={setTransactions}
//           fixedType="expense"
//         />
//       </div>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//         <div className="bg-white p-4 rounded-xl shadow">
//           <h3 className="text-gray-500">Total Expenses</h3>
//           <p className="text-2xl font-bold text-red-500">₹{total}</p>
//         </div>

//         <div className="bg-white p-4 rounded-xl shadow">
//           <h3 className="text-gray-500">Number of Expenses</h3>
//           <p className="text-2xl font-bold text-purple-600">
//             {expenseTransactions.length}
//           </p>
//         </div>

//         <div className="bg-white p-4 rounded-xl shadow">
//           <h3 className="text-gray-500">Highest Expense</h3>
//           <p className="text-2xl font-bold text-green-600">
//             ₹{highest}
//           </p>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="bg-white rounded-2xl shadow overflow-hidden">
//         <table className="w-full text-left">
//           <thead className="bg-gray-100 text-gray-600 text-sm uppercase">
//             <tr>
//               <th className="p-4">Date</th>
//               <th className="p-4">Category</th>
//               <th className="p-4 text-right">Amount</th>
//               <th className="p-4 text-right">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {expenseTransactions.length === 0 ? (
//               <tr>
//                 <td colSpan="4" className="text-center p-6 text-gray-500">
//                   No expenses found
//                 </td>
//               </tr>
//             ) : (
//               expenseTransactions.map((t) => (
//                 <tr
//                   key={t._id}
//                   className="border-t hover:bg-gray-50 transition"
//                 >
//                   <td className="p-4">
//                     {t.date
//                       ? new Date(t.date).toLocaleDateString("en-IN", {
//                           day: "2-digit",
//                           month: "short",
//                           year: "numeric",
//                         })
//                       : "—"}
//                   </td>

//                   <td className="p-4">
//                     <span
//                       className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryStyle(
//                         t.category
//                       )}`}
//                     >
//                       ● {t.category}
//                     </span>
//                   </td>

//                   <td className="p-4 text-right font-semibold text-red-500">
//                     ₹{t.amount}
//                   </td>

//                   <td className="p-4 text-right">
//                     <button
//                       onClick={() => handleDelete(t._id)}
//                       className="text-red-500 hover:text-red-700"
//                     >
//                       🗑
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Expense;