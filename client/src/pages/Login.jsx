
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




// 

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios/axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      return alert("Please fill all fields");
    }

    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fcfdff] relative overflow-hidden px-4">
      
      {/* --- STRONGER BACKGROUND GLOWS --- */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top Right - Purple Glow */}
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-purple-200/40 rounded-full blur-[110px]"></div>
        {/* Bottom Left - Indigo/Blue Glow */}
        <div className="absolute bottom-[-10%] left-[-5%] w-[700px] h-[700px] bg-indigo-100/60 rounded-full blur-[130px]"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* THE "POP" CARD:
            - shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)]: Adds heavy lifting
            - border-white/60: Adds a crisp edge
            - bg-white: Clean solid white to contrast with soft background
        */}
        <div className="bg-white rounded-[3rem] p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] border border-white/60">
          
          {/* Logo Section */}
          <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-16 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30 mb-4 transition-transform hover:scale-105 active:scale-95 cursor-pointer">
              <span className="text-3xl font-black text-white italic">B</span>
            </div>
            <h1 className="text-[10px] font-black tracking-[0.4em] text-gray-400 uppercase">
              Budget Buddy
            </h1>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-black text-gray-900 tracking-tight leading-tight">
              Welcome back
            </h2>
            <p className="text-gray-500 mt-2 font-medium">
              Log in to your precision dashboard
            </p>
          </div>

          <div className="space-y-6">
            {/* Email Input */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="name@company.com"
                className="w-full px-5 py-4 rounded-2xl border-none bg-gray-50/80 focus:ring-2 focus:ring-purple-400 transition-all outline-none text-gray-700 shadow-inner"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <div className="flex justify-between px-1">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                  Password
                </label>
                <span className="text-[11px] font-bold text-purple-600 hover:text-purple-800 cursor-pointer uppercase tracking-widest transition-colors">
                  Forgot?
                </span>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-5 py-4 rounded-2xl border-none bg-gray-50/80 focus:ring-2 focus:ring-purple-400 transition-all outline-none text-gray-700 shadow-inner"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Remember Me */}
            <label className="flex items-center gap-3 cursor-pointer group w-fit ml-1">
              <input 
                type="checkbox" 
                className="w-5 h-5 rounded-lg border-gray-200 text-purple-600 focus:ring-0 transition-all cursor-pointer accent-purple-600" 
              />
              <span className="text-sm text-gray-500 font-semibold group-hover:text-gray-800 transition-colors">
                Remember me
              </span>
            </label>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className={`w-full py-4 mt-2 rounded-2xl font-bold text-white transition-all duration-300 shadow-xl ${
                isLoading 
                ? "bg-gray-400 cursor-not-allowed shadow-none" 
                : "bg-gradient-to-r from-purple-600 to-indigo-600 shadow-purple-200 hover:shadow-purple-300 hover:translate-y-[-2px] active:translate-y-[1px]"
              }`}
            >
              {isLoading ? "Authenticating..." : "Access Dashboard"}
            </button>
          </div>

          {/* Social Divider */}
          <div className="flex items-center gap-4 my-9">
            <div className="flex-1 h-[1px] bg-gray-100" />
            <span className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] whitespace-nowrap">
              Or connect with
            </span>
            <div className="flex-1 h-[1px] bg-gray-100" />
          </div>

          {/* Social Buttons */}
          <div className="flex gap-4">
            <button className="flex-1 flex items-center justify-center gap-2 border border-gray-100 py-3.5 rounded-xl hover:bg-gray-50 hover:border-gray-200 transition-all text-sm font-bold text-gray-600">
               Google
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 border border-gray-100 py-3.5 rounded-xl hover:bg-gray-50 hover:border-gray-200 transition-all text-sm font-bold text-gray-600">
               Apple
            </button>
          </div>

          {/* Footer Link */}
          <p className="text-sm text-center mt-10 text-gray-500 font-semibold">
            New here?{" "}
            <span
              className="text-purple-600 font-black cursor-pointer hover:underline underline-offset-4 decoration-2"
              onClick={() => navigate("/signup")}
            >
              Create account
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;