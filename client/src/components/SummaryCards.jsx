
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














