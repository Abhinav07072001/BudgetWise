// import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Expenses from "./pages/Expenses";
// import Budgets from "./pages/Budgets"; // ✅ new
// import Goals from "./pages/Goals";     // ✅ new
// import Dashboard from "./pages/Dashboard";
// import { useEffect, useState } from "react";

// // ✅ Inner component (has Router context)
// function AppContent() {
//   const [user, setUser] = useState<any>(null);
//   const navigate = useNavigate();

//   // check login state
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) setUser(JSON.parse(storedUser));
//   }, []);

//   // logout logic
//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     navigate("/login");
//     setUser(null);
//   };

//   return (
//     <>
//       <nav className="bg-white border-b p-3 flex justify-between">
//         <Link to="/" className="font-semibold">
//           BudgetWise
//         </Link>
//         <div className="flex gap-3">
//           {!user ? (
//             <>
//               <Link to="/register">Register</Link>
//               <Link to="/login">Login</Link>
//             </>
//           ) : (
//             <>
//               <Link to="/dashboard">Dashboard</Link>
//               <Link to="/expenses">Expenses</Link>
//               <Link to="/budgets">Budgets</Link> {/* ✅ new */}
//               <Link to="/goals">Goals</Link>       {/* ✅ new */}
//               <button onClick={handleLogout} className="text-red-600">
//                 Logout
//               </button>
//             </>
//           )}
//         </div>
//       </nav>

//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/expenses" element={<Expenses />} />
//         <Route path="/budgets" element={<Budgets />} /> {/* ✅ new */}
//         <Route path="/goals" element={<Goals />} />     {/* ✅ new */}
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route
//           path="/"
//           element={<div className="p-6">Welcome to BudgetWise</div>}
//         />
//       </Routes>
//     </>
//   );
// }

// // ✅ Outer wrapper with Router provider
// export default function App() {
//   return (
//     <BrowserRouter>
//       <AppContent />
//     </BrowserRouter>
//   );
// }

import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Expenses from "./pages/Expenses";
import Budgets from "./pages/Budgets";
import Goals from "./pages/Goals";
import Dashboard from "./pages/Dashboard";
import { useEffect, useState } from "react";

function AppContent() {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  // 🔄 Sync login/logout across tabs and local changes
  useEffect(() => {
    const updateUser = () => {
      const stored = localStorage.getItem("user");
      setUser(stored ? JSON.parse(stored) : null);
    };

    updateUser();
    window.addEventListener("storage", updateUser);
    window.addEventListener("userChanged", updateUser); // ✅ custom trigger
    return () => {
      window.removeEventListener("storage", updateUser);
      window.removeEventListener("userChanged", updateUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("userChanged")); // ✅ tell navbar to update
    navigate("/login");
  };

  return (
    <>
      {/* <nav className="bg-white border-b p-3 flex justify-between">
        <Link to="/" className="font-semibold">BudgetWise</Link>
        <div className="flex gap-3">
          {!user ? (
            <>
              <Link to="/register">Register</Link>
              <Link to="/login">Login</Link>
            </>
          ) : (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/expenses">Expenses</Link>
              <Link to="/budgets">Budgets</Link>
              <Link to="/goals">Goals</Link>
              <button onClick={handleLogout} className="text-red-600">Logout</button>
            </>
          )}
        </div>
      </nav> */}
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-semibold text-gray-800 tracking-tight">
        💰 BudgetWise
      </Link>
      <div className="flex gap-4 text-gray-700 items-center">
        {!user ? (
          <>
            <Link to="/register" className="hover:text-indigo-600 transition">Register</Link>
            <Link to="/login" className="hover:text-indigo-600 transition">Login</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" className="hover:text-indigo-600 transition">Dashboard</Link>
            <Link to="/expenses" className="hover:text-indigo-600 transition">Expenses</Link>
            <Link to="/budgets" className="hover:text-indigo-600 transition">Budgets</Link>
            <Link to="/goals" className="hover:text-indigo-600 transition">Goals</Link>
            <button
              onClick={handleLogout}
              className="ml-2 text-red-600 font-medium hover:text-red-700 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
      </nav>


      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/budgets" element={<Budgets />} />
        <Route path="/goals" element={<Goals />} />
        <Route path="/" element={<div className="p-6">Welcome to BudgetWise</div>} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
