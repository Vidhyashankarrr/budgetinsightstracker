// import axiosInstance from "../axios/axios";
// import AddTransaction from "../components/AddTransaction";

// const Income = ({ transactions = [], setTransactions }) => {
//   const incomeTransactions = (transactions || []).filter(
//     (t) => t.type === "income"
//   );

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this income?")) return;
//     try {
//       await axiosInstance.delete(`/transactions/${id}`);
//       setTransactions((prev) => prev.filter((t) => t._id !== id));
//     } catch (err) {
//       if (err.response && err.response.status === 401) {
//         localStorage.clear();
//         window.location.href = "/login";
//       } else {
//         alert("Failed to delete income");
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen relative overflow-hidden bg-[#f8fafc] p-4 md:p-8">
      
//       {/* --- PREMIUM BACKGROUND GLOWS --- */}
//       <div className="fixed inset-0 pointer-events-none">
//         <div className="absolute -top-24 -left-24 w-96 h-96 bg-green-100/50 rounded-full blur-[100px]"></div>
//         <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-100/40 rounded-full blur-[120px]"></div>
//       </div>

//       <div className="max-w-5xl mx-auto relative z-10">
//         {/* Header Section */}
//         <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
//           <div>
//             <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-indigo-600">
//               My Income
//             </h2>
//             <p className="text-gray-500 mt-1 font-medium">Track and manage your earnings</p>
//           </div>
//           <div className="bg-green-500 px-6 py-3 rounded-2xl shadow-lg shadow-green-100 text-white">
//              <span className="text-xs uppercase opacity-80 block">Total Income</span>
//              <span className="text-2xl font-bold">
//                ₹{incomeTransactions.reduce((acc, curr) => acc + curr.amount, 0).toLocaleString('en-IN')}
//              </span>
//           </div>
//         </div>

//         {/* Add Transaction Section */}
//         <div className="mb-10 transform transition hover:scale-[1.01]">
//           <AddTransaction
//             setTransactions={setTransactions}
//             fixedType="income"
//           />
//         </div>

//         {/* Transactions List Container */}
//         <div className="bg-white/70 backdrop-blur-xl rounded-[2rem] shadow-xl shadow-gray-200/50 border border-white overflow-hidden">
//           <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white/50">
//             <h3 className="font-bold text-gray-800">Recent History</h3>
//             <span className="text-sm text-purple-600 font-semibold bg-purple-50 px-3 py-1 rounded-lg">
//               {incomeTransactions.length} Transactions
//             </span>
//           </div>

//           <div className="divide-y divide-gray-50">
//             {incomeTransactions.length === 0 ? (
//               <div className="py-20 text-center">
//                 <div className="text-5xl mb-4">💰</div>
//                 <p className="text-gray-400 font-medium">No income recorded yet.</p>
//               </div>
//             ) : (
//               incomeTransactions.map((t) => (
//                 <div
//                   key={t._id}
//                   className="group flex items-center justify-between p-5 hover:bg-purple-50/30 transition-all"
//                 >
//                   <div className="flex items-center gap-4">
//                     {/* Date Icon Box */}
//                     <div className="hidden sm:flex flex-col items-center justify-center w-14 h-14 bg-white border border-gray-100 rounded-2xl shadow-sm group-hover:border-purple-200">
//                       <span className="text-[10px] uppercase text-gray-400 font-bold">
//                         {t.date ? new Date(t.date).toLocaleString('en-IN', { month: 'short' }) : '—'}
//                       </span>
//                       <span className="text-lg font-bold text-gray-700 leading-none">
//                         {t.date ? new Date(t.date).getDate() : '—'}
//                       </span>
//                     </div>

//                     <div>
//                       <p className="font-bold text-gray-800 group-hover:text-purple-700 transition-colors">
//                         {t.category}
//                       </p>
//                       <p className="text-xs text-gray-400 sm:hidden">
//                         {t.date ? new Date(t.date).toLocaleDateString() : ""}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-6">
//                     <span className="text-xl font-black text-green-600">
//                       +₹{t.amount.toLocaleString('en-IN')}
//                     </span>
                    
//                     <button
//                       onClick={() => handleDelete(t._id)}
//                       className="p-2.5 rounded-xl text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
//                       title="Delete Entry"
//                     >
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                       </svg>
//                     </button>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Income;


import { useState } from "react";
import axiosInstance from "../axios/axios";
import AddTransaction from "../components/AddTransaction";

const Income = ({ transactions = [], setTransactions }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [sortBy, setSortBy] = useState("latest");

  // 1. Get only Income transactions
  const incomeTransactions = (transactions || []).filter((t) => t.type === "income");

  // 2. Filter & Sort Logic
  const filteredIncomes = incomeTransactions
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

  // Unique categories for the dropdown
  const categories = ["All", ...new Set(incomeTransactions.map((t) => t.category))];

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this income?")) return;
    try {
      await axiosInstance.delete(`/transactions/${id}`);
      setTransactions((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#f8fafc] p-4 md:p-8">
      
      {/* Background Glows (Same as before) */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-green-100/50 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-100/40 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-indigo-600">
              My Income
            </h2>
            <p className="text-gray-500 mt-1 font-medium">Track and manage your earnings</p>
          </div>
          <div className="bg-green-500 px-6 py-3 rounded-2xl shadow-lg shadow-green-100 text-white">
             <span className="text-xs uppercase opacity-80 block">Total Income</span>
             <span className="text-2xl font-bold">
               ₹{filteredIncomes.reduce((acc, curr) => acc + curr.amount, 0).toLocaleString('en-IN')}
             </span>
          </div>
        </div>

        {/* Add Transaction Section */}
        <div className="mb-10 transform transition hover:scale-[1.01]">
          <AddTransaction setTransactions={setTransactions} fixedType="income" />
        </div>

        {/* --- NEW SEARCH & FILTER BAR (Styled to match) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <input
            type="text"
            placeholder="Search category..."
            className="px-5 py-3 rounded-2xl border-none bg-white shadow-sm focus:ring-2 focus:ring-purple-400 text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="px-5 py-3 rounded-2xl border-none bg-white shadow-sm focus:ring-2 focus:ring-purple-400 text-sm text-gray-500"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select
            className="px-5 py-3 rounded-2xl border-none bg-white shadow-sm focus:ring-2 focus:ring-purple-400 text-sm text-gray-500"
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
            <h3 className="font-bold text-gray-800">Recent History</h3>
            <span className="text-sm text-purple-600 font-semibold bg-purple-50 px-3 py-1 rounded-lg">
              {filteredIncomes.length} Found
            </span>
          </div>

          <div className="divide-y divide-gray-50">
            {filteredIncomes.length === 0 ? (
              <div className="py-20 text-center text-gray-400 italic">No income records found.</div>
            ) : (
              filteredIncomes.map((t) => (
                <div key={t._id} className="group flex items-center justify-between p-5 hover:bg-purple-50/30 transition-all">
                  <div className="flex items-center gap-4">
                    {/* Calendar Date Icon Box */}
                    <div className="flex flex-col items-center justify-center w-14 h-14 bg-white border border-gray-100 rounded-2xl shadow-sm group-hover:border-purple-200">
                      <span className="text-[10px] uppercase text-gray-400 font-bold">
                        {t.date ? new Date(t.date).toLocaleString('en-IN', { month: 'short' }) : '—'}
                      </span>
                      <span className="text-lg font-bold text-gray-700 leading-none">
                        {t.date ? new Date(t.date).getDate() : '—'}
                      </span>
                    </div>

                    <div>
                      <p className="font-bold text-gray-800 group-hover:text-purple-700 transition-colors">{t.category}</p>
                      <p className="text-[10px] text-gray-400 font-medium">Verified Transaction</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <span className="text-xl font-black text-green-600">
                      +₹{t.amount.toLocaleString('en-IN')}
                    </span>
                    
                    <button
                      onClick={() => handleDelete(t._id)}
                      className="p-2.5 rounded-xl text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
                    >
                      🗑️
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

export default Income;


// import axiosInstance from "../axios/axios";
// import AddTransaction from "../components/AddTransaction";


// const Income = ({ transactions = [], setTransactions }) => {
//   const incomeTransactions = (transactions || []).filter(
//     (t) => t.type === "income"
//   );

//   const handleDelete = async (id) => {
//     try {
//       //  axios instance (token auto added)
//       await axiosInstance.delete(`/transactions/${id}`);

//       setTransactions((prev) => prev.filter((t) => t._id !== id));
//     } catch (err) {
//       console.error(err);

//       if (err.response && err.response.status === 401) {
//         localStorage.clear();
//         alert("Session expired. Please login again.");
//         window.location.href = "/login";
//       } else {
//         alert("Failed to delete income");
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen p-6 bg-gray-50">
//       <h2 className="text-3xl font-bold mb-6 text-purple-700">
//         My Income
//       </h2>

//       <div className="mb-6">
//         <AddTransaction
//           setTransactions={setTransactions}
//           fixedType="income"
//         />
//       </div>

//       <div className="bg-white rounded-2xl shadow overflow-hidden">
//         {/* Header */}
//         <div className="grid grid-cols-4 bg-gray-100 text-gray-600 text-sm font-semibold p-4">
//           <span>Date</span>
//           <span>Category</span>
//           <span className="text-right">Amount</span>
//           <span className="text-right">Actions</span>
//         </div>

//         {/* Data */}
//         {incomeTransactions.length === 0 ? (
//           <p className="text-center text-gray-500 py-10">
//             No income found
//           </p>
//         ) : (
//           incomeTransactions.map((t) => (
//             <div
//               key={t._id}
//               className="grid grid-cols-4 items-center p-4 border-t hover:bg-gray-50"
//             >
//               <span className="text-gray-700">
//                 {t.date
//                   ? new Date(t.date).toLocaleDateString("en-IN", {
//                       day: "2-digit",
//                       month: "short",
//                       year: "numeric",
//                     })
//                   : "—"}
//               </span>

//               <span>
//                 <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-600 font-medium">
//                   {t.category}
//                 </span>
//               </span>

//               <span className="text-right font-semibold text-green-600">
//                 ₹{t.amount}
//               </span>

//               <div className="flex justify-end">
//                 <button
//                   onClick={() => handleDelete(t._id)}
//                   className="text-gray-400 hover:text-red-500"
//                 >
//                   🗑️
//                 </button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default Income;


















