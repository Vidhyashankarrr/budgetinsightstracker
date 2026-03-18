const TransactionList = ({ transactions }) => {
  const [filter, setFilter] = useState("all");

  const filteredTransactions =
    filter === "all"
      ? transactions
      : transactions.filter((t) => t.type === filter);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex gap-3 mb-4">
        {["all", "income", "expense"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1 rounded ${
              filter === f
                ? "bg-purple-600 text-white"
                : "bg-gray-100"
            }`}
          >
            {f.toUpperCase()}
          </button>
        ))}
      </div>

      {filteredTransactions.map((t, i) => (
        <div key={i} className="flex justify-between border-b py-2">
          <span>{t.title}</span>
          <span
            className={
              t.type === "income" ? "text-green-600" : "text-red-500"
            }
          >
            {t.type === "income" ? "+" : "-"}₹{t.amount}
          </span>
        </div>
      ))}
    </div>
  );
};

export default TransactionList;

