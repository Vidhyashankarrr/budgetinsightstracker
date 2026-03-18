const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");

const {
  getTransactions,
  addTransaction,
} = require("../controllers/transactionController");

router.get("/", getTransactions);
router.post("/", addTransaction);

// ✅ FIXED DELETE ROUTE
router.delete("/:id", async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
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