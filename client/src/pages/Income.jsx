import axiosInstance from "../axios/axios";
import AddTransaction from "../components/AddTransaction";


const Income = ({ transactions = [], setTransactions }) => {
  const incomeTransactions = (transactions || []).filter(
    (t) => t.type === "income"
  );

  const handleDelete = async (id) => {
    try {
      //  axios instance (token auto added)
      await axiosInstance.delete(`/transactions/${id}`);

      setTransactions((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);

      if (err.response && err.response.status === 401) {
        localStorage.clear();
        alert("Session expired. Please login again.");
        window.location.href = "/login";
      } else {
        alert("Failed to delete income");
      }
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h2 className="text-3xl font-bold mb-6 text-purple-700">
        My Income
      </h2>

      <div className="mb-6">
        <AddTransaction
          setTransactions={setTransactions}
          fixedType="income"
        />
      </div>

      <div className="bg-white rounded-2xl shadow overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-4 bg-gray-100 text-gray-600 text-sm font-semibold p-4">
          <span>Date</span>
          <span>Category</span>
          <span className="text-right">Amount</span>
          <span className="text-right">Actions</span>
        </div>

        {/* Data */}
        {incomeTransactions.length === 0 ? (
          <p className="text-center text-gray-500 py-10">
            No income found
          </p>
        ) : (
          incomeTransactions.map((t) => (
            <div
              key={t._id}
              className="grid grid-cols-4 items-center p-4 border-t hover:bg-gray-50"
            >
              <span className="text-gray-700">
                {t.date
                  ? new Date(t.date).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                  : "—"}
              </span>

              <span>
                <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-600 font-medium">
                  {t.category}
                </span>
              </span>

              <span className="text-right font-semibold text-green-600">
                ₹{t.amount}
              </span>

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


















