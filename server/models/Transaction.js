// const mongoose = require("mongoose");

// const transactionSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User"
//   },
//   type: {
//     type: String,
//     enum: ["income", "expense"],
//   },
//   amount: Number,
//   category: String,
//   date: {
//     type: Date,
//     default: Date.now,
//   },
// }, { timestamps: true });

// module.exports = mongoose.model("Transaction", transactionSchema);

const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    enum: ["income", "expense"],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  title: String,
  date: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

module.exports = mongoose.model("Transaction", transactionSchema);