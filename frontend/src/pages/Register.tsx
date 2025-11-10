// import { useState } from "react";
// import { api } from "../api/client";

// export default function Register() {
//   const [form, setForm] = useState({
//     email: "",
//     name: "",
//     password: "",
//     currency: "INR",
//   });
//   const [msg, setMsg] = useState("");

//   const handleRegister = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await api.post("/auth/register", form);
//       setMsg("✅ Registered successfully, now login!");
//     } catch (err: any) {
//       setMsg("❌ " + err.response?.data?.error || "Register failed");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <form
//         onSubmit={handleRegister}
//         className="bg-white p-6 rounded-xl shadow-md w-80"
//       >
//         <h1 className="text-xl font-semibold mb-4">Register</h1>
//         <input
//           className="input mb-2"
//           placeholder="Name"
//           value={form.name}
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//         />
//         <input
//           className="input mb-2"
//           placeholder="Email"
//           value={form.email}
//           onChange={(e) => setForm({ ...form, email: e.target.value })}
//         />
//         <input
//           className="input mb-2"
//           placeholder="Password"
//           type="password"
//           value={form.password}
//           onChange={(e) => setForm({ ...form, password: e.target.value })}
//         />
//         <input
//           className="input mb-3"
//           placeholder="Currency (INR)"
//           value={form.currency}
//           onChange={(e) => setForm({ ...form, currency: e.target.value })}
//         />
//         <button className="btn w-full">Register</button>
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
import { useNavigate } from "react-router-dom"; // ✅ added

export default function Register() {
  const [form, setForm] = useState({
    email: "",
    name: "",
    password: "",
    currency: "INR",
  });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate(); // ✅ initialize navigation

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", form);
      setMsg("✅ Registered successfully! Redirecting to login...");
      // ✅ redirect after short delay
      setTimeout(() => navigate("/login"), 1000);
    } catch (err: any) {
      setMsg("❌ " + (err.response?.data?.error || "Register failed"));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleRegister}
        className="bg-white p-6 rounded-xl shadow-md w-80"
      >
        <h1 className="text-xl font-semibold mb-4">Register</h1>
        <input
          className="input mb-2"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="input mb-2"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          className="input mb-2"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <input
          className="input mb-3"
          placeholder="Currency (INR)"
          value={form.currency}
          onChange={(e) => setForm({ ...form, currency: e.target.value })}
        />
        <button className="btn w-full">Register</button>
        <p className="text-sm mt-2 text-center">{msg}</p>
      </form>
      <style>{`
        .input {border:1px solid #ccc; padding:.6rem; border-radius:.5rem; width:100%;}
        .btn {background:black;color:white;padding:.6rem;border-radius:.5rem;}
      `}</style>
    </div>
  );
}
