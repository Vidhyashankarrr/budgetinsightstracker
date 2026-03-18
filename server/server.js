const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const transactionRoutes = require("./routes/transactionRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.get("/",(req,res)=>{res.json({message:"THIS IS HOME PAGE"})})
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on", PORT));

































// const express = require("express");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const connectDB = require("./config/db");

// dotenv.config();
// connectDB();

// const app = express();

// app.use(cors());
// app.use(express.json());

// // app.use("/api/auth", require("./routes/authRoutes"));
// app.use("/api/auth", (req, res) => {
//   res.send("Auth route working");
// });
// app.use("/api/transactions", require("./routes/transactionRoutes"));
// const authRoutes = require("./routes/authRoutes");
// app.use("/api/auth", authRoutes);

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// require("dotenv").config();

// const authRoutes = require("./routes/authRoutes");

// const app = express();

// app.use(cors());
// app.use(express.json());

// // ✅ ROUTES
// app.use("/api/auth", authRoutes);

// // DB connect
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB Connected"))
//   .catch(err => console.log(err));

// // server start
// app.listen(5000, () => console.log("Server running on port 5000"));


// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// require("dotenv").config();

// const authRoutes = require("./routes/authRoutes");
// const transactionRoutes = require("./routes/transactionRoutes"); // ✅ add this

// const app = express();

// app.use(cors());
// app.use(express.json());

// // ✅ ROUTES
// app.use("/api/auth", authRoutes);
// app.use("/api/transactions", transactionRoutes); // ✅ transactions route

// // DB connect
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB Connected"))
//   .catch(err => console.log(err));

// // server start
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log("Server running on port", PORT));

