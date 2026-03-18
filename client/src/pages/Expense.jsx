import AddTransaction from "../components/AddTransaction";
import axios from "axios";

const Expense = ({ transactions = [], setTransactions }) => {
  const token = localStorage.getItem("token");
  const expenseTransactions = (transactions || []).filter((t) => t.type === "expense");

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/transactions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransactions((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const total = expenseTransactions.reduce((sum, t) => sum + t.amount, 0);
  const highest = expenseTransactions.length ? Math.max(...expenseTransactions.map((t) => t.amount)) : 0;

  const getCategoryStyle = (category) => {
    switch (category) {
      case "Food": return "bg-orange-100 text-orange-600";
      case "Transport": return "bg-blue-100 text-blue-600";
      case "Shopping": return "bg-purple-100 text-purple-600";
      case "Rent": return "bg-green-100 text-green-600";
      case "Utilities": return "bg-yellow-100 text-yellow-600";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h2 className="text-3xl font-bold mb-6 text-purple-700">My Expenses</h2>

      <div className="mb-8">
        <AddTransaction setTransactions={setTransactions} fixedType="expense" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-gray-500">Total Expenses</h3>
          <p className="text-2xl font-bold text-red-500">₹{total}</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-gray-500">Number of Expenses</h3>
          <p className="text-2xl font-bold text-purple-600">{expenseTransactions.length}</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-gray-500">Highest Expense</h3>
          <p className="text-2xl font-bold text-green-600">₹{highest}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-600 text-sm uppercase">
            <tr>
              <th className="p-4">Date</th>
              <th className="p-4">Category</th>
              <th className="p-4 text-right">Amount</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenseTransactions.length === 0 ? (
              <tr><td colSpan="4" className="text-center p-6 text-gray-500">No expenses found</td></tr>
            ) : (
              expenseTransactions.map((t) => (
                <tr key={t._id} className="border-t hover:bg-gray-50 transition">
                  <td className="p-4">{new Date(t.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryStyle(t.category)}`}>● {t.category}</span>
                  </td>
                  <td className="p-4 text-right font-semibold text-red-500">₹{t.amount}</td>
                  <td className="p-4 text-right">
                    <button onClick={() => handleDelete(t._id)} className="text-red-500 hover:text-red-700">🗑</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Expense;