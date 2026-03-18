// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import image from "../assets/image.jpg";

// const Login = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   // 🔥 AUTO LOGIN IF TOKEN EXISTS
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) navigate("/");
//   }, [navigate]);

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/auth/login",
//         { email, password }
//       );

//       // 🔥 SAVE TOKEN + USER
//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("user", JSON.stringify(res.data.user));

//       navigate("/");
//     } catch (err) {
//       alert(err.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div className="min-h-screen grid md:grid-cols-2 bg-gray-100">

//       {/* Left */}
//       <div className="flex items-center justify-center p-6">
//         <form
//           onSubmit={handleLogin}
//           className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6"
//         >
//           <h2 className="text-3xl font-bold text-purple-600 text-center">
//             Welcome Back
//           </h2>

//           <p className="text-center text-gray-500">
//             Please login to continue
//           </p>

//           <div className="space-y-4">
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Email"
//               className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
//               required
//             />

//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Password"
//               className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
//               required
//             />
//           </div>

//           <button className="w-full bg-gradient-to-r from-purple-500 to-purple-700 text-white py-3 rounded-lg font-semibold">
//             Login
//           </button>

//           {/* 🔥 Go to Signup */}
//           <p className="text-center text-sm">
//             Don’t have an account?{" "}
//             <span
//               onClick={() => navigate("/signup")}
//               className="text-purple-600 cursor-pointer"
//             >
//               Signup
//             </span>
//           </p>
//         </form>
//       </div>

//       {/* Right */}
//       <div className="hidden md:flex items-center justify-center bg-purple-50">
//         <img src={image} alt="Finance" className="w-3/4" />
//       </div>
//     </div>
//   );
// };

// export default Login;












import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    // ✅ Validation
    if (!email || !password) {
      return alert("Please fill all fields");
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      // ✅ Store user + token
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // ✅ Redirect
      navigate("/");
      window.location.reload();

    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-lg w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded mb-3"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded mb-3"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700"
        >
          Login
        </button>

        {/* ✅ Redirect to Signup */}
        <p className="text-sm mt-4 text-center">
          Don’t have an account?{" "}
          <span
            className="text-purple-600 cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Signup
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;