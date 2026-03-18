import AddTransaction from "../components/AddTransaction";
import axios from "axios";

const Income = ({ transactions, setTransactions }) => {
  const incomeTransactions = transactions.filter((t) => t.type === "income");

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/transactions/${id}`);

      setTransactions((prev) =>
        prev.filter((t) => (t._id || t.id) !== id)
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h2 className="text-3xl font-bold mb-6 text-purple-700">
        My Income
      </h2>

      {/* Add Income */}
      <div className="mb-6">
        <AddTransaction
          setTransactions={setTransactions}
          fixedType="income"
        />
      </div>

      {/* 🔥 TABLE */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-4 bg-gray-100 text-gray-600 text-sm font-semibold p-4">
          <span>Date</span>
          <span>Category</span>
          <span className="text-right">Amount</span>
          <span className="text-right">Actions</span>
        </div>

        {/* Rows */}
        {incomeTransactions.length === 0 ? (
          <p className="text-center text-gray-500 py-10">
            No income found
          </p>
        ) : (
          incomeTransactions.map((t) => (
            <div
              key={t._id || t.id}
              className="grid grid-cols-4 items-center p-4 border-t hover:bg-gray-50"
            >
              {/* Date */}
              <span className="text-gray-700">
                {new Date(t.date).toLocaleDateString()}
              </span>

              {/* Category */}
              <span>
                <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-600 font-medium">
                  {t.category}
                </span>
              </span>

              {/* Amount */}
              <span className="text-right font-semibold text-green-600">
                ₹{t.amount}
              </span>

              {/* Delete */}
              <div className="flex justify-end">
                <button
                  onClick={() => handleDelete(t._id)}
                  className="text-gray-400 hover:text-red-500"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Income;


























// import AddTransaction from "../components/AddTransaction";

// const Income = ({ transactions, setTransactions }) => {
//   const incomeTransactions = transactions.filter(
//     (t) => t.type === "income"
//   );

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-bold mb-4">Income</h2>

//       <AddTransaction
//         setTransactions={setTransactions}
//         fixedType="income"
//       />

//       <div className="mt-6">
//         {incomeTransactions.map((t) => (
//           <div
//             key={t._id}
//             className="bg-white p-3 mb-2 rounded shadow flex justify-between"
//           >
//             <span>{t.title}</span>
//             <span className="text-green-500">₹{t.amount}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Income;