import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
      const res = await fetch("http://localhost:5000/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify(newTransaction),
      });

      // 
      if (res.status === 401) {
        localStorage.clear();
        alert("Session expired. Please login again.");
        return navigate("/login");
      }

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to add transaction");
      }

      const data = await res.json();

      //  Update UI 
      setTransactions([data, ...transactions]);

      //  Reset form
      e.target.reset();
      setCategory("Food");
      setType(fixedType || "expense");

    } catch (err) {
      console.error("AddTransaction error:", err);
      alert(err.message);
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



