// import axiosInstance from "../axios/axios";


// const RecentTransactions = ({ transactions, setTransactions }) => {
//   const deleteTransaction = async (id) => {
//     try {
//       // axios delete
//       await axiosInstance.delete(`/transactions/${id}`);

//       //  update UI instantly
//       const updated = transactions.filter((t) => t._id !== id);
//       setTransactions(updated);

//     } catch (err) {
//       console.error("Delete failed", err);

//       if (err.response && err.response.status === 401) {
//         localStorage.clear();
//         alert("Session expired. Please login again.");
//         window.location.href = "/login";
//       } else {
//         alert("Failed to delete transaction");
//       }
//     }
//   };

//   if (!transactions.length) {
//     return (
//       <div className="bg-white p-6 rounded-2xl shadow-xl">
//         <h3 className="font-semibold mb-4 text-lg text-purple-700">
//           Recent Transactions
//         </h3>
//         <p className="text-gray-500 text-center">No transactions yet</p>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white p-6 rounded-2xl shadow-xl space-y-4">
//       <h3 className="font-semibold text-lg text-purple-700">
//         Recent Transactions
//       </h3>

//       {transactions.map((t) => (
//         <div
//           key={t._id}
//           className="flex justify-between items-center border-b pb-3"
//         >
//           <div>
//             <p className="font-medium">{t.title}</p>
//             <p className="text-sm text-gray-500">{t.category}</p>
//           </div>

//           <div className="flex items-center gap-4">
//             <span
//               className={`font-semibold ${
//                 t.type === "income" ? "text-green-600" : "text-red-600"
//               }`}
//             >
//               {t.type === "income" ? "+" : "-"}₹{t.amount}
//             </span>

//             <button
//               onClick={() => deleteTransaction(t._id)}
//               className="text-red-500 hover:text-red-700 text-lg"
//             >
//               ✕
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default RecentTransactions;




import axiosInstance from "../axios/axios";

const RecentTransactions = ({ transactions, setTransactions }) => {
  const deleteTransaction = async (id) => {
    if (!window.confirm("Are you sure you want to delete this?")) return;
    try {
      await axiosInstance.delete(`/transactions/${id}`);
      const updated = transactions.filter((t) => t._id !== id);
      setTransactions(updated);
    } catch (err) {
      console.error("Delete failed", err);
      if (err.response && err.response.status === 401) {
        localStorage.clear();
        window.location.href = "/login";
      } else {
        alert("Failed to delete transaction");
      }
    }
  };

  // Only show the 5 most recent for the dashboard view
  const displayTransactions = [...transactions].slice(0, 5);

  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white overflow-hidden transition-all duration-500 hover:shadow-[0_30px_60px_rgba(79,70,229,0.1)]">
      
      {/* Header Section */}
      <div className="p-8 border-b border-gray-100/50 flex justify-between items-center bg-white/40">
        <div>
          <h3 className="font-black text-xl text-gray-800 tracking-tight">
            Recent Activity
          </h3>
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">
            Your latest movements
          </p>
        </div>
        <button 
          onClick={() => window.location.href = transactions[0]?.type === 'income' ? '/income' : '/expense'}
          className="text-xs font-bold text-purple-600 bg-purple-50 px-4 py-2 rounded-xl hover:bg-purple-600 hover:text-white transition-all shadow-sm"
        >
          View All
        </button>
      </div>

      <div className="divide-y divide-gray-50/50">
        {!displayTransactions.length ? (
          <div className="py-20 text-center">
            <div className="text-4xl mb-3">🎐</div>
            <p className="text-gray-400 font-medium italic">No transactions found yet.</p>
          </div>
        ) : (
          displayTransactions.map((t) => (
            <div
              key={t._id}
              className="group flex items-center justify-between p-6 hover:bg-white/80 transition-all duration-300"
            >
              <div className="flex items-center gap-5">
                {/* 1. Calendar Style Date Icon */}
                <div className="flex flex-col items-center justify-center w-14 h-14 bg-white border border-gray-100 rounded-[1.25rem] shadow-sm group-hover:border-purple-200 group-hover:shadow-md transition-all">
                  <span className="text-[9px] uppercase text-purple-500 font-black tracking-tighter">
                    {t.date ? new Date(t.date).toLocaleString('en-IN', { month: 'short' }) : '---'}
                  </span>
                  <span className="text-lg font-black text-gray-800 leading-none">
                    {t.date ? new Date(t.date).getDate() : '--'}
                  </span>
                </div>

                {/* 2. Title and Category */}
                <div>
                  <p className="font-bold text-gray-800 group-hover:text-purple-700 transition-colors">
                    {t.title || t.category}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${t.type === 'income' ? 'bg-green-400' : 'bg-red-400'}`}></span>
                    <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">
                      {t.category}
                    </p>
                  </div>
                </div>
              </div>

              {/* 3. Amount and Actions */}
              <div className="flex items-center gap-6">
                <span
                  className={`text-lg font-black tracking-tight ${
                    t.type === "income" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {t.type === "income" ? "+" : "-"}₹{t.amount.toLocaleString('en-IN')}
                </span>

                <button
                  onClick={() => deleteTransaction(t._id)}
                  className="p-2.5 rounded-xl text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0"
                  title="Remove"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          )
        ))}
      </div>
      
      {/* Bottom Stats Footer */}
      <div className="p-4 bg-gray-50/50 border-t border-gray-100/50 text-center">
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">
          Secured by Budget Buddy
        </p>
      </div>
    </div>
  );
};

export default RecentTransactions;




























