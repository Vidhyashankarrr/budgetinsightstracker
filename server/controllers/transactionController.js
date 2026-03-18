const Transaction = require("../models/Transaction");

// ✅ ADD transaction
exports.addTransaction = async (req, res) => {
  try {
    const { type, amount, category, title } = req.body;

    const transaction = await Transaction.create({
      type,
      amount,
      category,
      title,
    });

    res.json(transaction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ✅ GET all transactions
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ createdAt: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};