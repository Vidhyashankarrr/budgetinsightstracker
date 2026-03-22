import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios/axios";

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async () => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedName || trimmedName.length < 3) return alert("Name must be at least 3 characters");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) return alert("Enter a valid email address");
    if (!trimmedPassword || trimmedPassword.length < 6) return alert("Password must be at least 6 characters");

    setIsLoading(true);
    try {
      await axiosInstance.post("/auth/signup", {
        name: trimmedName,
        email: trimmedEmail,
        password: trimmedPassword,
      });
      alert("Account created successfully! 🎉");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] relative overflow-hidden font-sans px-4">
      
      {/* --- PREMIUM BACKGROUND GLOWS --- */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-200/50 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-100/60 rounded-full blur-[130px]"></div>
      </div>

      {/* --- SIGNUP CARD --- */}
      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/80 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl shadow-indigo-100/50 border border-white p-10">
          
          {/* Logo/Icon */}
          <div className="w-16 h-16 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-200 mb-6 mx-auto">
            <span className="text-3xl font-black text-white italic">B</span>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">Create Account</h2>
            <p className="text-gray-500 mt-2 font-medium">Start your journey with Budget Buddy</p>
          </div>

          <div className="space-y-5">
            {/* Name Input */}
            <div>
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
              <input
                placeholder="Enter your name"
                className="w-full mt-1 px-5 py-3.5 rounded-2xl border-none bg-gray-50/50 focus:ring-2 focus:ring-purple-400 transition-all outline-none text-gray-700 shadow-inner"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
              <input
                type="email"
                placeholder="name@example.com"
                className="w-full mt-1 px-5 py-3.5 rounded-2xl border-none bg-gray-50/50 focus:ring-2 focus:ring-purple-400 transition-all outline-none text-gray-700 shadow-inner"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full mt-1 px-5 py-3.5 rounded-2xl border-none bg-gray-50/50 focus:ring-2 focus:ring-purple-400 transition-all outline-none text-gray-700 shadow-inner"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Signup Button */}
            <button
              onClick={handleSignup}
              disabled={isLoading}
              className={`w-full py-4 mt-4 rounded-2xl font-bold text-white transition-all duration-300 shadow-xl shadow-purple-200 ${
                isLoading 
                ? "bg-gray-400 cursor-not-allowed" 
                : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:scale-[1.02] active:scale-[0.98]"
              }`}
            >
              {isLoading ? "Creating Account..." : "Join Now"}
            </button>
          </div>

          {/* Social Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-[1px] bg-gray-100" />
            <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Social Signup</span>
            <div className="flex-1 h-[1px] bg-gray-100" />
          </div>

          <div className="flex gap-4">
            <button className="flex-1 flex items-center justify-center gap-2 border border-gray-100 py-3 rounded-xl hover:bg-gray-50 transition text-sm font-semibold text-gray-600">
              <span className="text-lg">G</span> Google
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 border border-gray-100 py-3 rounded-xl hover:bg-gray-50 transition text-sm font-semibold text-gray-600">
              <span className="text-lg"></span> Apple
            </button>
          </div>

          {/* Footer */}
          <p className="text-sm text-center mt-8 text-gray-500 font-medium">
            Already a member?{" "}
            <span
              className="text-purple-600 font-bold cursor-pointer hover:underline"
              onClick={() => navigate("/login")}
            >
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axiosInstance from "../axios/axios";

// const Signup = () => {
//   const navigate = useNavigate();

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSignup = async () => {
//     // Trim values (avoid space issues)
//     const trimmedName = name.trim();
//     const trimmedEmail = email.trim();
//     const trimmedPassword = password.trim();

//     // Name validation
//     if (!trimmedName || trimmedName.length < 3) {
//       return alert("Name must be at least 3 characters");
//     }

//     // Email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(trimmedEmail)) {
//       return alert("Enter a valid email address");
//     }

//     // Password validation
//     if (!trimmedPassword || trimmedPassword.length < 6) {
//       return alert("Password must be at least 6 characters");
//     }

//     try {
//       await axiosInstance.post("/auth/signup", {
//         name: trimmedName,
//         email: trimmedEmail,
//         password: trimmedPassword,
//       });

//       alert("Signup successful 🎉");
//       navigate("/login");
//     } catch (err) {
//       alert(err.response?.data?.message || "Signup failed");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#f4f6f8]">
//       <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        
//         {/* Title */}
//         <h2 className="text-2xl font-bold text-gray-900 mb-2">
//           Create Account
//         </h2>
//         <p className="text-sm text-gray-500 mb-6">
//           Join the precision vitality ecosystem.
//         </p>

//         {/* Name */}
//         <label className="text-xs text-gray-500">FULL NAME</label>
//         <input
//           placeholder="John Doe"
//           className="w-full mt-1 mb-4 px-4 py-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-400"
//           onChange={(e) => setName(e.target.value)}
//         />

//         {/* Email */}
//         <label className="text-xs text-gray-500">EMAIL ADDRESS</label>
//         <input
//           type="email"
//           placeholder="name@company.com"
//           className="w-full mt-1 mb-4 px-4 py-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-400"
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         {/* Password */}
//         <label className="text-xs text-gray-500">PASSWORD</label>
//         <input
//           type="password"
//           placeholder="••••••••"
//           className="w-full mt-1 mb-6 px-4 py-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-400"
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         {/* Button */}
//         <button
//           onClick={handleSignup}
//           className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-lg font-semibold transition"
//         >
//           Create Account
//         </button>

//         {/* Divider */}
//         <div className="flex items-center gap-3 my-6">
//           <div className="flex-1 h-px bg-gray-200" />
//           <span className="text-xs text-gray-400">OR CONTINUE WITH</span>
//           <div className="flex-1 h-px bg-gray-200" />
//         </div>

//         {/* Social */}
//         <div className="flex gap-3">
//           <button className="w-full border rounded-lg py-2 text-sm">
//             Google
//           </button>
//           <button className="w-full border rounded-lg py-2 text-sm">
//             Apple
//           </button>
//         </div>

//         {/* Login */}
//         <p className="text-sm text-center mt-6 text-gray-500">
//           Already have an account?{" "}
//           <span
//             className="text-purple-500 font-medium cursor-pointer"
//             onClick={() => navigate("/login")}
//           >
//             Sign in
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Signup;


























// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axiosInstance from "../axios/axios";

// const Signup = () => {
//   const navigate = useNavigate();

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSignup = async () => {
//     if (!name || !email || !password) {
//       return alert("All fields are required");
//     }

//     try {
//       await axiosInstance.post("/auth/signup", {
//         name,
//         email,
//         password,
//       });

//       alert("Signup successful 🎉");
//       navigate("/login");
//     } catch (err) {
//       alert(err.response?.data?.message || "Signup failed");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#f4f6f8]">
//       <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        
//         {/* Title */}
//         <h2 className="text-2xl font-bold text-gray-900 mb-2">
//           Create Account
//         </h2>
//         <p className="text-sm text-gray-500 mb-6">
//           Join the precision vitality ecosystem.
//         </p>

//         {/* Name */}
//         <label className="text-xs text-gray-500">FULL NAME</label>
//         <input
//           placeholder="John Doe"
//           className="w-full mt-1 mb-4 px-4 py-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-400"
//           onChange={(e) => setName(e.target.value)}
//         />

//         {/* Email */}
//         <label className="text-xs text-gray-500">EMAIL ADDRESS</label>
//         <input
//           type="email"
//           placeholder="name@company.com"
//           className="w-full mt-1 mb-4 px-4 py-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-400"
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         {/* Password */}
//         <label className="text-xs text-gray-500">PASSWORD</label>
//         <input
//           type="password"
//           placeholder="••••••••"
//           className="w-full mt-1 mb-6 px-4 py-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-400"
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         {/* Button */}
//         <button
//           onClick={handleSignup}
//           className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-lg font-semibold transition"
//         >
//           Create Account
//         </button>

//         {/* Divider */}
//         <div className="flex items-center gap-3 my-6">
//           <div className="flex-1 h-px bg-gray-200" />
//           <span className="text-xs text-gray-400">OR CONTINUE WITH</span>
//           <div className="flex-1 h-px bg-gray-200" />
//         </div>

//         {/* Social */}
//         <div className="flex gap-3">
//           <button className="w-full border rounded-lg py-2 text-sm">
//             Google
//           </button>
//           <button className="w-full border rounded-lg py-2 text-sm">
//             Apple
//           </button>
//         </div>

//         {/* Login */}
//         <p className="text-sm text-center mt-6 text-gray-500">
//           Already have an account?{" "}
//           <span
//             className="text-purple-500 font-medium cursor-pointer"
//             onClick={() => navigate("/login")}
//           >
//             Sign in
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Signup;





























// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import axiosInstance from "../axios/axios";


// const Signup = () => {
//   const navigate = useNavigate();

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSignup = async () => {
//     //  Validation
//     if (!name || !email || !password) {
//       return alert("All fields are required");
//     }

//     try {
//       await axiosInstance.post(
//         "/auth/signup",
//         { name, email, password }
//       );

//       alert("Signup successful 🎉");
//       navigate("/login");

//     } catch (err) {
//       alert(err.response?.data?.message || "Signup failed");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-6 rounded-xl shadow-lg w-80">
//         <h2 className="text-xl font-bold mb-4 text-center">Signup</h2>

//         <input
//           placeholder="Name"
//           className="w-full p-2 border rounded mb-3"
//           onChange={(e) => setName(e.target.value)}
//         />

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
//           onClick={handleSignup}
//           className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700"
//         >
//           Signup
//         </button>

//         {/* Redirect to Login */}
//         <p className="text-sm mt-4 text-center">
//           Already have an account?{" "}
//           <span
//             className="text-purple-600 cursor-pointer"
//             onClick={() => navigate("/login")}
//           >
//             Login
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Signup;