


const Transaction = require("../models/Transaction");

// ADD transaction for logged-in user
exports.addTransaction = async (req, res) => {
  try {
    const { type, amount, category, title } = req.body;

    const transaction = await Transaction.create({
      type,
      amount,
      category,
      title,
      date: new Date(),
      user: req.user.id, // associate with logged-in user
    });

    res.status(201).json(transaction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// GET transactions for logged-in user
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};// const Transaction = require("../models/Transaction");

// // ✅ ADD transaction
// exports.addTransaction = async (req, res) => {
//   try {
//     const { type, amount, category, title } = req.body;
//     const userId = req.userId; // coming from auth middleware

//     const transaction = await Transaction.create({
//       user: userId,
//       type,
//       amount,
//       category,
//       title,
//       date: new Date(),
//     });

//     res.status(201).json(transaction);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// // ✅ GET all transactions for logged-in user
// exports.getTransactions = async (req, res) => {
//   try {
//     const userId = req.userId;
//     const transactions = await Transaction.find({ user: userId }).sort({ createdAt: -1 });
//     res.json(transactions);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };


// // const Transaction = require("../models/Transaction");

// // // ✅ ADD transaction
// // exports.addTransaction = async (req, res) => {
// //   try {
// //     const { type, amount, category, title } = req.body;

// //     const transaction = await Transaction.create({
// //       type,
// //       amount,
// //       category,
// //       title,
// //     });

// //     res.json(transaction);
// //   } catch (err) {
// //     res.status(400).json({ message: err.message });
// //   }
// // };

// // // ✅ GET all transactions
// // exports.getTransactions = async (req, res) => {
// //   try {
// //     const transactions = await Transaction.find().sort({ createdAt: -1 });
// //     res.json(transactions);
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // };

// const Transaction = require("../models/Transaction");

// // ✅ ADD transaction
// exports.addTransaction = async (req, res) => {
//   try {
//     const { type, amount, category, title } = req.body;

//     const transaction = await Transaction.create({
//       type,
//       amount,
//       category,
//       title,
//       date: new Date()
//     });

//     res.status(201).json(transaction);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// // ✅ GET all transactions
// exports.getTransactions = async (req, res) => {
//   try {
//     const transactions = await Transaction.find().sort({ createdAt: -1 });
//     res.json(transactions);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };