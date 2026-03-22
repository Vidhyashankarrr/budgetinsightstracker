
// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import axiosInstance from "../axios/axios";

// const Login = () => {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = async () => {
//     //  Validation
//     if (!email || !password) {
//       return alert("Please fill all fields");
//     }

//     try {
//       const res = await axiosInstance.post(
//         "/auth/login",
//         { email, password }
//       );

//       //  Store user + token
//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("user", JSON.stringify(res.data.user));

//       //  Redirect
//       navigate("/");
//       window.location.reload();

//     } catch (err) {
//       alert(err.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-6 rounded-xl shadow-lg w-80">
//         <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full p-2 border rounded mb-3"
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full p-2 border rounded mb-3"
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button
//           onClick={handleLogin}
//           className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700"
//         >
//           Login
//         </button>

//         {/*  Redirect to Signup */}
//         <p className="text-sm mt-4 text-center">
//           Don’t have an account?{" "}
//           <span
//             className="text-purple-600 cursor-pointer"
//             onClick={() => navigate("/signup")}
//           >
//             Signup
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;




import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios/axios";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      return alert("Please fill all fields");
    }

    try {
      const res = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/");
      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f6f8]">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        
        {/* Logo / Title */}
        <h1 className="text-center text-lg font-semibold text-gray-700 mb-6">
          BUDGET BUDDY
        </h1>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome back
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Enter your details to access your dashboard
        </p>

        {/* Email */}
        <label className="text-xs text-gray-500">EMAIL ADDRESS</label>
        <input
          type="email"
          placeholder="name@company.com"
          className="w-full mt-1 mb-4 px-4 py-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-400"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <div className="flex justify-between items-center">
          <label className="text-xs text-gray-500">PASSWORD</label>
          <span className="text-xs text-gray-400 cursor-pointer">
            Forgot password?
          </span>
        </div>
        <input
          type="password"
          placeholder="••••••••"
          className="w-full mt-1 mb-4 px-4 py-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-400"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Checkbox */}
        <div className="flex items-center gap-2 mb-5">
          <input type="checkbox" className="accent-green-500" />
          <span className="text-sm text-gray-500">
            Stay signed in for 30 days
          </span>
        </div>

        {/* Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-lg font-semibold transition"
        >
          Sign In
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400">OR CONTINUE WITH</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Social Buttons */}
        <div className="flex gap-3">
          <button className="w-full border rounded-lg py-2 text-sm">
            Google
          </button>
          <button className="w-full border rounded-lg py-2 text-sm">
            Apple
          </button>
        </div>

        {/* Signup */}
        <p className="text-sm text-center mt-6 text-gray-500">
          Don’t have an account?{" "}
          <span
            className="text-purple-500 font-medium cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Create account
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;