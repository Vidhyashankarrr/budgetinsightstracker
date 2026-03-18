// const express = require("express");
// const router = express.Router();
// const Transaction = require("../models/Transaction");

// const {
//   getTransactions,
//   addTransaction,
// } = require("../controllers/transactionController");

// router.get("/", getTransactions);
// router.post("/", addTransaction);

// // ✅ FIXED DELETE ROUTE
// router.delete("/:id", async (req, res) => {
//   try {
//     await Transaction.findByIdAndDelete(req.params.id);
//     res.json({ message: "Deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;


const express = require("express");
const router = express.Router();
const auth = require("../middleware/authmiddleware.js");
const { getTransactions, addTransaction } = require("../controllers/transactionController");

// GET all transactions for logged-in user
router.get("/", auth, getTransactions);

// ADD new transaction for logged-in user
router.post("/", auth, addTransaction);

// DELETE transaction by id for logged-in user
router.delete("/:id", auth, async (req, res) => {
  try {
    const Transaction = require("../models/Transaction");
    const deleted = await Transaction.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!deleted) return res.status(404).json({ message: "Transaction not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

















// const express = require("express");
// const router = express.Router();
// const { getTransactions, addTransaction } = require("../controllers/transactionController");

// router.get("/", getTransactions);
// router.post("/", addTransaction);
// router.delete("/transactions/:id", async (req, res) => {
//   try {
//     await Transaction.findByIdAndDelete(req.params.id);
//     res.json({ message: "Deleted" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;