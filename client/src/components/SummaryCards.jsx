
import React from "react";

const SummaryCards = ({ transactions }) => {
  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white shadow-xl rounded-2xl p-6 flex flex-col">
        <p className="text-gray-400">Income</p>
        <h2 className="text-2xl font-bold text-green-500">₹{totalIncome}</h2>
      </div>

      <div className="bg-white shadow-xl rounded-2xl p-6 flex flex-col">
        <p className="text-gray-400">Expenses</p>
        <h2 className="text-2xl font-bold text-red-500">₹{totalExpense}</h2>
      </div>

      <div className="bg-white shadow-xl rounded-2xl p-6 flex flex-col">
        <p className="text-gray-400">Balance</p>
        <h2 className="text-2xl font-bold text-purple-600">₹{totalIncome - totalExpense}</h2>
      </div>
    </div>
  );
};

export default SummaryCards;














// const SummaryCards = ({ transactions = [] }) => {
//   const income = transactions
//     .filter((t) => t.type === "income")
//     .reduce((acc, t) => acc + Number(t.amount), 0);

//   const expense = transactions
//     .filter((t) => t.type === "expense")
//     .reduce((acc, t) => acc + Number(t.amount), 0);

//   const balance = income - expense;

//   return (
    
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//       {/* Balance */}
//       <div className="bg-white p-6 rounded shadow text-center">
//         <p className="text-gray-500">Total Balance</p>
//         <h2 className="text-2xl font-bold">₹{balance}</h2>
//       </div>

//       {/* Income */}
//       <div className="bg-white p-6 rounded shadow text-center">
//         <p className="text-gray-500">Total Income</p>
//         <h2 className="text-2xl font-bold text-green-600">
//           ₹{income}
//         </h2>
//       </div>

//       {/* Expense */}
//       <div className="bg-white p-6 rounded shadow text-center">
//         <p className="text-gray-500">Total Expense</p>
//         <h2 className="text-2xl font-bold text-red-600">
//           ₹{expense}
//         </h2>
//       </div>
//     </div>
    
//   );
// };

// export default SummaryCards;

