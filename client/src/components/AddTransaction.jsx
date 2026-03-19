import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios/axios";


const AddTransaction = ({ transactions = [], setTransactions, fixedType }) => {
  const [category, setCategory] = useState("Food");
  const [type, setType] = useState(fixedType || "expense");
  const navigate = useNavigate();

  const addTransaction = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("You are not logged in. Please login first.");
      return navigate("/login");
    }

    const newTransaction = {
      title: e.target.title.value,
      amount: Number(e.target.amount.value),
      type: fixedType || type,
      category,
    };

    try {
      // ✅ axios instead of fetch
      const res = await axiosInstance.post("/transactions", newTransaction);

      const data = res.data;

      // ✅ Update UI instantly
      setTransactions([data, ...transactions]);

      // ✅ Reset form
      e.target.reset();
      setCategory("Food");
      setType(fixedType || "expense");

    } catch (err) {
      console.error("AddTransaction error:", err);

      if (err.response && err.response.status === 401) {
        localStorage.clear();
        alert("Session expired. Please login again.");
        navigate("/login");
      } else {
        alert(err.response?.data?.message || "Failed to add transaction");
      }
    }
  };

  return (
    <form
      onSubmit={addTransaction}
      className="bg-white p-6 rounded-2xl shadow-xl flex flex-col gap-4"
    >
      {/* Title */}
      <input
        name="title"
        placeholder="Title"
        className="border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
        required
      />

      {/* Amount */}
      <input
        name="amount"
        type="number"
        placeholder="Amount"
        className="border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
        required
      />

      {/* Type */}
      {!fixedType && (
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      )}

      {/* Category */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
      >
        <option>Food</option>
        <option>Transport</option>
        <option>Bills</option>
        <option>Salary</option>
        <option>Business</option>
        <option>Youtube revenue</option>
        <option>Shopping</option>
        <option>Rent</option>
        <option>Other</option>
      </select>

      {/* Button */}
      <button className="bg-gradient-to-r from-purple-500 to-purple-700 text-white py-3 rounded-xl hover:opacity-90 transition">
        Add {fixedType || type}
      </button>
    </form>
  );
};

export default AddTransaction;


