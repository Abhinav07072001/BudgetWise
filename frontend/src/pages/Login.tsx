// import { useState } from "react";
// import { api } from "../api/client";
// import { useNavigate } from "react-router-dom"; // ✅ added

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [msg, setMsg] = useState("");
//   const navigate = useNavigate(); // ✅ initialize navigation

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const res = await api.post("/auth/login", { email, password });
//       setMsg("✅ Logged in as " + res.data.user.name);
//       localStorage.setItem("user", JSON.stringify(res.data.user));

//       // ✅ redirect to /expenses after short delay
//       setTimeout(() => navigate("/expenses"), 1000);
//     } catch (err: any) {
//       setMsg("❌ " + (err.response?.data?.error || "Login failed"));
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <form
//         onSubmit={handleLogin}
//         className="bg-white p-6 rounded-xl shadow-md w-80"
//       >
//         <h1 className="text-xl font-semibold mb-4">Login</h1>
//         <input
//           className="input mb-2"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           className="input mb-3"
//           placeholder="Password"
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button className="btn w-full">Login</button>
//         <p className="text-sm mt-2 text-center">{msg}</p>
//       </form>
//       <style>{`
//         .input {border:1px solid #ccc; padding:.6rem; border-radius:.5rem; width:100%;}
//         .btn {background:black;color:white;padding:.6rem;border-radius:.5rem;}
//       `}</style>
//     </div>
//   );
// }

import { useState } from "react";
import { api } from "../api/client";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      setMsg("✅ Logged in as " + res.data.user.name);

      // ✅ save user and trigger navbar update immediately
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      window.dispatchEvent(new Event("userChanged")); // 🔄 updates navbar instantly

      // ✅ redirect to /expenses after short delay
      setTimeout(() => navigate("/expenses"), 800);
    } catch (err: any) {
      setMsg("❌ " + (err.response?.data?.error || "Login failed"));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-xl shadow-md w-80"
      >
        <h1 className="text-xl font-semibold mb-4">Login</h1>

        <input
          className="input mb-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="input mb-3"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn w-full">Login</button>
        <p className="text-sm mt-2 text-center">{msg}</p>
      </form>

      <style>{`
        .input {
          border: 1px solid #ccc;
          padding: .6rem;
          border-radius: .5rem;
          width: 100%;
        }
        .btn {
          background: black;
          color: white;
          padding: .6rem;
          border-radius: .5rem;
        }
      `}</style>
    </div>
  );
}
