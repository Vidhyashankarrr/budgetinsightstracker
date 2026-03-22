



import { useState, useEffect } from "react";
import axiosInstance from "../axios/axios";
import { Wallet, AlertCircle, CheckCircle2, Loader2, TrendingUp } from "lucide-react";

const BudgetTracker = ({ transactions, userId }) => {
  const [budget, setBudget] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // 1. Basic Calculations
  const expenses = transactions.filter((t) => t.type === "expense");
  const totalSpent = expenses.reduce((sum, t) => sum + t.amount, 0);
  const budgetNum = Number(budget) || 0;
  
  // 2. Prediction Logic (Spending Velocity)
  const today = new Date();
  const dayOfMonth = today.getDate();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  
  // Prediction = (Current Spent / Days Passed) * Total Days in Month
  const predictedSpending = dayOfMonth > 0 ? (totalSpent / dayOfMonth) * daysInMonth : 0;
  const willExceed = budgetNum > 0 && predictedSpending > budgetNum;

  const progress = budgetNum > 0 ? Math.min((totalSpent / budgetNum) * 100, 100) : 0;
  const isCurrentlyExceeded = budgetNum > 0 && totalSpent > budgetNum;

  useEffect(() => {
    const fetchBudget = async () => {
      const id = userId || JSON.parse(localStorage.getItem("user"))?._id;
      if (!id) return;
      try {
        const res = await axiosInstance.get(`/budget/${id}`);
        if (res.data?.budget !== undefined) {
          setBudget(String(res.data.budget));
          localStorage.setItem("budget", String(res.data.budget));
        }
      } catch (err) {
        const saved = localStorage.getItem("budget");
        if (saved) setBudget(saved);
      }
    };
    fetchBudget();
  }, [userId]);

  const handleBudgetChange = async (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Only numbers
    setBudget(value);
    localStorage.setItem("budget", value);

    const id = userId || JSON.parse(localStorage.getItem("user"))?._id;
    if (!id || value === "") return;

    try {
      setIsSaving(true);
      await axiosInstance.post(`/budget/${id}`, { budget: Number(value) });
    } catch (err) {
      console.warn("Sync failed", err);
    } finally {
      setTimeout(() => setIsSaving(false), 800);
    }
  };

  return (
    <div className="bg-white p-6 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-100 w-full max-w-[400px] mx-auto space-y-4 relative overflow-hidden">
      
      {/* AI Glow Effect if prediction is bad */}
      {willExceed && !isCurrentlyExceeded && (
        <div className="absolute top-0 right-0 w-20 h-20 bg-orange-400/10 blur-[40px] rounded-full pointer-events-none"></div>
      )}

      {/* Header */}
      <div className="text-center relative">
        <h3 className="text-lg font-black text-purple-700 tracking-tight flex items-center justify-center gap-2">
          Monthly Budget {isSaving && <Loader2 size={14} className="animate-spin text-purple-400" />}
        </h3>
      </div>

      {/* Input */}
      <input
        type="text"
        placeholder="Enter budget amount"
        value={budget}
        onChange={handleBudgetChange}
        className="w-full bg-white border border-gray-900 px-4 py-3 rounded-2xl font-bold text-gray-700 focus:ring-2 focus:ring-purple-400 text-center outline-none transition-all"
      />

      {/* Stats Line */}
      <div className="flex justify-between px-1 border-b border-gray-50 pb-3">
        <div className="text-center flex-1">
          <p className="text-[10px] font-black text-gray-400 uppercase">Spent</p>
          <p className="font-bold text-gray-800">₹{totalSpent.toLocaleString()}</p>
        </div>
        <div className="w-[1px] bg-gray-100 mx-2"></div>
        <div className="text-center flex-1">
          <p className="text-[10px] font-black text-gray-400 uppercase">Forecast</p>
          <p className={`font-bold ${willExceed ? 'text-orange-500' : 'text-indigo-600'}`}>
            ₹{Math.round(predictedSpending).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1.5">
        <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-1000 ${
              isCurrentlyExceeded ? "bg-red-500" : "bg-purple-600"
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between items-center px-1">
           <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Usage: {Math.round(progress)}%</span>
           {budgetNum > 0 && (
             <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Goal: ₹{budgetNum.toLocaleString()}</span>
           )}
        </div>
      </div>

      {/* AI Prediction Footer */}
      <div className="mt-2 pt-2 border-t border-gray-50">
        {willExceed && !isCurrentlyExceeded ? (
          <div className="flex items-start gap-2 bg-orange-50 p-3 rounded-xl">
            <TrendingUp size={16} className="text-orange-500 mt-0.5 shrink-0" />
            <p className="text-[10px] leading-tight font-bold text-orange-700 uppercase tracking-tight">
              AI Insight: At this rate, you'll exceed budget by ₹{Math.round(predictedSpending - budgetNum).toLocaleString()} this month.
            </p>
          </div>
        ) : isCurrentlyExceeded ? (
          <div className="flex items-center gap-2 justify-center text-red-500 text-[10px] font-black uppercase">
            <AlertCircle size={14} /> Limit Exceeded
          </div>
        ) : budgetNum > 0 ? (
          <div className="flex items-center gap-2 justify-center text-emerald-500 text-[10px] font-black uppercase">
            <CheckCircle2 size={14} /> On track to save ₹{Math.round(budgetNum - predictedSpending).toLocaleString()}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default BudgetTracker;















// import { useState, useEffect } from "react";
// import axiosInstance from "../axios/axios";


// const BudgetTracker = ({ transactions, userId }) => {
//   const [budget, setBudget] = useState(
//     Number(localStorage.getItem("budget")) || 0
//   );
//   const [loading, setLoading] = useState(false);

//   // Calculate total expenses
//   const expense = transactions
//     .filter((t) => t.type === "expense")
//     .reduce((sum, t) => sum + t.amount, 0);

//   const balance = budget - expense;
//   const isExceeded = budget > 0 && expense > budget;

//   // ✅ Fetch budget from backend
//   useEffect(() => {
//     const fetchBudget = async () => {
//       if (!userId) return;

//       try {
//         const res = await axiosInstance.get(`/budget/${userId}`);
//         if (res.data?.budget) {
//           setBudget(Number(res.data.budget));
//         }
//       } catch (err) {
//         console.warn("Backend fetch failed, using localStorage", err);
//       }
//     };

//     fetchBudget();
//   }, [userId]);

//   // ✅ Update backend & localStorage
//   const handleBudgetChange = async (e) => {
//     const newBudget = Number(e.target.value);
//     setBudget(newBudget);
//     localStorage.setItem("budget", newBudget);

//     if (!userId) return;

//     try {
//       setLoading(true);

//       await axiosInstance.post(`/budget/${userId}`, {
//         budget: newBudget,
//       });

//     } catch (err) {
//       console.warn("Failed to save budget to backend", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-white p-6 rounded-2xl shadow-xl max-w-md mx-auto space-y-4">
//       <h3 className="text-xl font-bold text-center text-purple-700">
//         Monthly Budget
//       </h3>

//       <input
//         type="number"
//         placeholder="Enter budget amount"
//         value={budget}
//         onChange={handleBudgetChange}
//         className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
//       />

//       <div className="flex justify-between text-sm text-gray-600">
//         <span>Spent: ₹{expense}</span>
//         <span>Balance: ₹{balance >= 0 ? balance : 0}</span>
//       </div>

//       {/* Progress Bar */}
//       <div className="w-full bg-gray-200 rounded-full h-3">
//         <div
//           className={`h-3 rounded-full ${
//             isExceeded ? "bg-red-500" : "bg-green-500"
//           }`}
//           style={{
//             width: `${
//               budget ? Math.min((expense / budget) * 100, 100) : 0
//             }%`,
//           }}
//         />
//       </div>

//       {isExceeded && (
//         <p className="text-red-600 font-semibold text-center">
//           ⚠ Budget Limit Exceeded
//         </p>
//       )}

//       {loading && (
//         <p className="text-center text-gray-500">Saving...</p>
//       )}
//     </div>
//   );
// };

// export default BudgetTracker;
































