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


















