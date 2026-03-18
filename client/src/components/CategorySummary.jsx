const CategorySummary = ({ transactions }) => {
  const summary = {};

  transactions.forEach((t) => {
    if (t.type === "expense") {
      summary[t.category] =
        (summary[t.category] || 0) + t.amount;
    }
  });

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="font-semibold mb-4">Expense by Category</h3>

      {Object.keys(summary).map((cat) => (
        <div
          key={cat}
          className="flex justify-between border-b py-2"
        >
          <span>{cat}</span>
          <span className="font-semibold text-red-500">
            ₹{summary[cat]}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CategorySummary;
