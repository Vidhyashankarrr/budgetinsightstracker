import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddTransaction = ({ transactions = [], setTransactions, fixedType }) => {
  const [category, setCategory] = useState("Food");
  const [type, setType] = useState(fixedType || "expense");
  const navigate = useNavigate();

  const addTransaction = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    // 🔴 No token → redirect
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
          Authorization: `Bearer ${token}`, // ✅ important
        },
        body: JSON.stringify(newTransaction),
      });

      // 🔴 Token expired
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

      // ✅ Update UI instantly
      setTransactions([data, ...transactions]);

      // ✅ Reset form
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




// import { useState } from "react";

// const AddTransaction = ({ transactions, setTransactions, fixedType }) => {
//   const [category, setCategory] = useState("Food");
//   const [type, setType] = useState(fixedType || "expense");

//   const addTransaction = async (e) => {
//     e.preventDefault();

//     const newTransaction = {
//       title: e.target.title.value,
//       amount: Number(e.target.amount.value),
//       type: fixedType || type,
//       category,
//     };

//     try {
//       const token = localStorage.getItem("token"); // <--- Add token
//       const res = await fetch("http://localhost:5000/api/transactions", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`, // <--- Authorization header
//         },
//         body: JSON.stringify(newTransaction),
//       });

//       if (!res.ok) throw new Error("Failed to add transaction");
//       const data = await res.json();
//       setTransactions([data, ...transactions]);
//       e.target.reset();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <form
//       onSubmit={addTransaction}
//       className="bg-white p-6 rounded-2xl shadow-xl flex flex-col gap-4"
//     >
//       <input
//         name="title"
//         placeholder="Title"
//         className="border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
//         required
//       />
//       <input
//         name="amount"
//         type="number"
//         placeholder="Amount"
//         className="border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
//         required
//       />
//       {!fixedType && (
//         <select
//           name="type"
//           value={type}
//           onChange={(e) => setType(e.target.value)}
//           className="border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
//         >
//           <option value="expense">Expense</option>
//           <option value="income">Income</option>
//         </select>
//       )}
//       <select
//         value={category}
//         onChange={(e) => setCategory(e.target.value)}
//         className="border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
//       >
//         <option>Food</option>
//         <option>Transport</option>
//         <option>Bills</option>
//         <option>Salary</option>
//         <option>Business</option>
//         <option>Youtube revenue</option>
//         <option>shopping</option>
//         <option>rent</option>
//         <option>Other</option>
//       </select>

//       <button className="bg-gradient-to-r from-purple-500 to-purple-700 text-white py-3 rounded-xl hover:opacity-90 transition">
//         Add {fixedType || type}
//       </button>
//     </form>
//   );
// };

// export default AddTransaction;












// import { useState } from "react";

// const AddTransaction = ({ transactions = [], setTransactions, fixedType }) => {
//   const [category, setCategory] = useState("Food");
//   const [type, setType] = useState(fixedType || "expense");
//   const token = localStorage.getItem("token");

//   const addTransaction = async (e) => {
//     e.preventDefault();

//     const newTransaction = {
//       title: e.target.title.value,
//       amount: Number(e.target.amount.value),
//       type: fixedType || type,
//       category,
//     };

//     try {
//       const res = await fetch("http://localhost:5000/api/transactions", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(newTransaction),
//       });

//       const data = await res.json();
//       setTransactions([data, ...(transactions || [])]);
//       e.target.reset();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <form onSubmit={addTransaction} className="bg-white p-6 rounded-2xl shadow-xl flex flex-col gap-4">
//       <input name="title" placeholder="Title" className="border p-3 rounded-xl" required />
//       <input name="amount" type="number" placeholder="Amount" className="border p-3 rounded-xl" required />
//       {!fixedType && (
//         <select name="type" value={type} onChange={(e) => setType(e.target.value)} className="border p-3 rounded-xl">
//           <option value="expense">Expense</option>
//           <option value="income">Income</option>
//         </select>
//       )}
//       <select value={category} onChange={(e) => setCategory(e.target.value)} className="border p-3 rounded-xl">
//         <option>Food</option>
//         <option>Transport</option>
//         <option>Bills</option>
//         <option>Salary</option>
//         <option>Business</option>
//         <option>Youtube revenue</option>
//         <option>Shopping</option>
//         <option>Rent</option>
//         <option>Other</option>
//       </select>
//       <button className="bg-gradient-to-r from-purple-500 to-purple-700 text-white py-3 rounded-xl">
//         Add {fixedType || type}
//       </button>
//     </form>
//   );
// };

// export default AddTransaction;// import { useState } from "react";

// const AddTransaction = ({ transactions, setTransactions, fixedType }) => {
//   const [category, setCategory] = useState("Food");
//   const [type, setType] = useState(fixedType || "expense");

//   const addTransaction = async (e) => {
//     e.preventDefault();

//     const newTransaction = {
//       title: e.target.title.value,
//       amount: Number(e.target.amount.value),
//       type: fixedType || type,
//       category,
//     };

//     try {
//       const res = await fetch("http://localhost:5000/api/transactions", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(newTransaction),
//       });

//       const data = await res.json();
//       setTransactions([data, ...transactions]);
//       e.target.reset();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <form
//       onSubmit={addTransaction}
//       className="bg-white p-6 rounded-2xl shadow-xl flex flex-col gap-4"
//     >
//       <input
//         name="title"
//         placeholder="Title"
//         className="border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
//         required
//       />
//       <input
//         name="amount"
//         type="number"
//         placeholder="Amount"
//         className="border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
//         required
//       />
//       {!fixedType && (
//         <select
//           name="type"
//           value={type}
//           onChange={(e) => setType(e.target.value)}
//           className="border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
//         >
//           <option value="expense">Expense</option>
//           <option value="income">Income</option>
//         </select>
//       )}
//       <select
//         value={category}
//         onChange={(e) => setCategory(e.target.value)}
//         className="border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
//       >
//         <option>Food</option>
//         <option>Transport</option>
//         <option>Bills</option>
//         <option>Salary</option>
//         <option>Business</option>
//         <option>Youtube revenue</option>
//         <option>shopping</option>
//         <option>rent</option>
//         <option>Other</option>
//       </select>

//       <button className="bg-gradient-to-r from-purple-500 to-purple-700 text-white py-3 rounded-xl hover:opacity-90 transition">
//         Add {fixedType || type}
//       </button>
//     </form>
//   );
// };

// export default AddTransaction;





















































// import { useState } from "react";

// const AddTransaction = ({ setTransactions, fixedType }) => {
//   const [category, setCategory] = useState("Food");
//   const [type, setType] = useState(fixedType || "expense");

//   const addTransaction = async (e) => {
//     e.preventDefault();

//     const newTransaction = {
//       title: e.target.title.value,
//       amount: Number(e.target.amount.value),
//       type: fixedType || type,
//       category,
//     };

//     try {
//       const res = await fetch("http://localhost:5000/api/transactions", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(newTransaction),
//       });

//       const data = await res.json();

//       // ✅ update UI safely
//       setTransactions((prev) => [data, ...prev]);

//       e.target.reset();
//     } catch (err) {
//       console.error("Error adding transaction:", err);
//     }
//   };

//   return (
//     <form onSubmit={addTransaction} className="bg-white p-6 rounded shadow">
//       {/* Title */}
//       <input
//         name="title"
//         placeholder="Title"
//         className="border p-2 w-full mb-3"
//         required
//       />

//       {/* Amount */}
//       <input
//         name="amount"
//         type="number"
//         placeholder="Amount"
//         className="border p-2 w-full mb-3"
//         required
//       />

//       {/* Type Selector */}
//       {!fixedType && (
//         <select
//           value={type}
//           onChange={(e) => setType(e.target.value)}
//           className="border p-2 w-full mb-3"
//         >
//           <option value="expense">Expense</option>
//           <option value="income">Income</option>
//         </select>
//       )}

//       {/* Category */}
//       <select
//         value={category}
//         onChange={(e) => setCategory(e.target.value)}
//         className="border p-2 w-full mb-3"
//       >
//         <option>Food</option>
//         <option>Transport</option>
//         <option>Bills</option>
//         <option>Salary</option>
//         <option>Other</option>
//       </select>

//       {/* Button */}
//       <button className="bg-purple-600 text-white px-6 py-2 rounded w-full">
//         Add {fixedType || type}
//       </button>
//     </form>
//   );
// };

// export default AddTransaction;



// import { useState } from "react";

// const AddTransaction = ({ transactions, setTransactions, fixedType }) => {
//   const [category, setCategory] = useState("Food");
//   const [type, setType] = useState(fixedType || "expense"); // local state for type

//   const addTransaction = (e) => {
//     e.preventDefault();

//     const newTransaction = {
//       id: Date.now(),
//       title: e.target.title.value,
//       amount: Number(e.target.amount.value),
//       type: fixedType || type, // use local type if fixedType is not provided
//       category,
//       date: new Date().toISOString(),
//     };

//     const updated = [newTransaction, ...transactions];
//     setTransactions(updated);
//     localStorage.setItem("transactions", JSON.stringify(updated));

//     e.target.reset();
//   };

//   return (
//     <form onSubmit={addTransaction} className="bg-white p-6 rounded shadow">
//       <input
//         name="title"
//         placeholder="Title"
//         className="border p-2 w-full mb-3"
//         required
//       />
//       <input
//         name="amount"
//         type="number"
//         placeholder="Amount"
//         className="border p-2 w-full mb-3"
//         required
//       />

//       {/* Conditionally render type selector if fixedType is not provided */}
//       {!fixedType && (
//         <select
//           name="type"
//           value={type}
//           onChange={(e) => setType(e.target.value)}
//           className="border p-2 w-full mb-3"
//         >
//           <option value="expense">Expense</option>
//           <option value="income">Income</option>
//         </select>
//       )}

//       <select
//         value={category}
//         onChange={(e) => setCategory(e.target.value)}
//         className="border p-2 w-full mb-3"
//       >
//         <option>Food</option>
//         <option>Transport</option>
//         <option>Bills</option>
//         <option>Salary</option>
//         <option>Other</option>
//       </select>

//       <button className="bg-purple-600 text-white px-6 py-2 rounded">
//         Add {fixedType || type}
//       </button>
//     </form>
//   );
// };

// export default AddTransaction;
