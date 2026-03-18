import { useState, useEffect } from "react";

const BudgetTracker = ({ transactions, userId }) => {
  const [budget, setBudget] = useState(
    Number(localStorage.getItem("budget")) || 0
  );
  const [loading, setLoading] = useState(false);

  // Calculate total expenses
  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = budget - expense;
  const isExceeded = budget > 0 && expense > budget;

  // Fetch budget from backend on mount
  useEffect(() => {
    const fetchBudget = async () => {
      if (!userId) return; // skip if no userId

      try {
        const res = await fetch(`http://localhost:5000/api/budget/${userId}`);
        if (!res.ok) throw new Error("Failed to fetch budget");
        const data = await res.json();
        if (data.budget) setBudget(Number(data.budget));
      } catch (err) {
        console.warn("Backend fetch failed, using localStorage", err);
      }
    };

    fetchBudget();
  }, [userId]);

  // Update backend & localStorage when budget changes
  const handleBudgetChange = async (e) => {
    const newBudget = Number(e.target.value);
    setBudget(newBudget);
    localStorage.setItem("budget", newBudget);

    if (!userId) return; // skip backend if not logged in

    try {
      setLoading(true);
      await fetch(`http://localhost:5000/api/budget/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ budget: newBudget }),
      });
    } catch (err) {
      console.warn("Failed to save budget to backend", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl max-w-md mx-auto space-y-4">
      <h3 className="text-xl font-bold text-center text-purple-700">Monthly Budget</h3>

      <input
        type="number"
        placeholder="Enter budget amount"
        value={budget}
        onChange={handleBudgetChange}
        className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
      />

      <div className="flex justify-between text-sm text-gray-600">
        <span>Spent: ₹{expense}</span>
        <span>Balance: ₹{balance >= 0 ? balance : 0}</span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className={`h-3 rounded-full ${
            isExceeded ? "bg-red-500" : "bg-green-500"
          }`}
          style={{ width: `${budget ? Math.min((expense / budget) * 100, 100) : 0}%` }}
        />
      </div>

      {isExceeded && (
        <p className="text-red-600 font-semibold text-center">
          ⚠ Budget Limit Exceeded
        </p>
      )}

      {loading && <p className="text-center text-gray-500">Saving...</p>}
    </div>
  );
};

export default BudgetTracker;
































