const RecentTransactions = ({ transactions, setTransactions }) => {
  const deleteTransaction = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/transactions/${id}`, {
        method: "DELETE",
      });

      const updated = transactions.filter((t) => t._id !== id);
      setTransactions(updated);
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  if (!transactions.length) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-xl">
        <h3 className="font-semibold mb-4 text-lg text-purple-700">
          Recent Transactions
        </h3>
        <p className="text-gray-500 text-center">No transactions yet</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl space-y-4">
      <h3 className="font-semibold text-lg text-purple-700">
        Recent Transactions
      </h3>

      {transactions.map((t) => (
        <div
          key={t._id}
          className="flex justify-between items-center border-b pb-3"
        >
          <div>
            <p className="font-medium">{t.title}</p>
            <p className="text-sm text-gray-500">{t.category}</p>
          </div>

          <div className="flex items-center gap-4">
            <span
              className={`font-semibold ${
                t.type === "income" ? "text-green-600" : "text-red-600"
              }`}
            >
              {t.type === "income" ? "+" : "-"}₹{t.amount}
            </span>

            <button
              onClick={() => deleteTransaction(t._id)}
              className="text-red-500 hover:text-red-700 text-lg"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentTransactions;

































