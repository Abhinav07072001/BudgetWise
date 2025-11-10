// import { useState } from "react";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { api } from "../api/client";

// export default function Expenses() {
//   const qc = useQueryClient();
//   const { data } = useQuery({
//     queryKey: ["expenses"],
//     queryFn: async () => (await api.get("/expenses")).data,
//   });

//   const [form, setForm] = useState({
//     date: "",
//     amount: "",
//     currency: "INR",
//     category: "",
//     note: "",
//   });

//   const add = useMutation({
//   mutationFn: async () =>
//     api.post("/expenses", {
//       ...form,
//       amount: Number(form.amount),
//     }),
//   onSuccess: () => {
//     qc.invalidateQueries({ queryKey: ["expenses"] });
//     // ✅ clear form after successful add
//     setForm({
//       date: "",
//       amount: "",
//       currency: "INR",
//       category: "",
//       note: "",
//     });
//   },
// });


//   const del = useMutation({
//     mutationFn: async (id: string) => api.delete(`/expenses/${id}`),
//     onSuccess: () => qc.invalidateQueries({ queryKey: ["expenses"] }),
//   });

//   return (
//     <div className="p-6 grid md:grid-cols-2 gap-6">
//       <div className="bg-white p-4 rounded-xl shadow">
//         <h2 className="font-semibold mb-2">Add Expense</h2>
//         <div className="grid gap-2">
//           <input
//             className="input"
//             placeholder="Date (YYYY-MM-DD)"
//             value={form.date}
//             onChange={(e) => setForm({ ...form, date: e.target.value })}
//           />
//           <input
//             className="input"
//             placeholder="Amount"
//             value={form.amount}
//             onChange={(e) => setForm({ ...form, amount: e.target.value })}
//           />
//           <input
//             className="input"
//             placeholder="Currency"
//             value={form.currency}
//             onChange={(e) => setForm({ ...form, currency: e.target.value })}
//           />
//           <input
//             className="input"
//             placeholder="Category"
//             value={form.category}
//             onChange={(e) => setForm({ ...form, category: e.target.value })}
//           />
//           <input
//             className="input"
//             placeholder="Note"
//             value={form.note}
//             onChange={(e) => setForm({ ...form, note: e.target.value })}
//           />
//           <button onClick={() => add.mutate()} className="btn">
//             Save
//           </button>
//         </div>
//       </div>

//       <div className="bg-white p-4 rounded-xl shadow">
//         <h2 className="font-semibold mb-2">Recent Expenses</h2>
//         <ul className="divide-y">
//           {(data || []).map((e: any) => (
//             <li key={e._id} className="py-2 flex items-center gap-2">
//               <span className="w-28">
//                 {new Date(e.date).toLocaleDateString()}
//               </span>
//               <span className="flex-1">
//                 {e.category} — {e.amount} {e.currency}
//               </span>
//               <button
//                 className="text-red-600"
//                 onClick={() => del.mutate(e._id)}
//               >
//                 Delete
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>

//       <style>{`
//         .input{border:1px solid #e5e7eb;padding:.6rem;border-radius:.5rem;width:100%}
//         .btn{background:black;color:white;padding:.6rem;border-radius:.5rem}
//       `}</style>
//     </div>
//   );
// }

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/client";
import { useAuth } from "../hooks/useAuth"; // ✅ added import

export default function Expenses() {
  const user = useAuth(); // ✅ redirect to /login if not logged in
  const qc = useQueryClient();

  const { data } = useQuery({
    queryKey: ["expenses"],
    queryFn: async () => (await api.get("/expenses")).data,
  });

  const [form, setForm] = useState({
    date: "",
    amount: "",
    currency: "INR",
    category: "",
    note: "",
  });

  const add = useMutation({
    mutationFn: async () =>
      api.post("/expenses", {
        ...form,
        amount: Number(form.amount),
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["expenses"] });
      // ✅ clear form after successful add
      setForm({
        date: "",
        amount: "",
        currency: "INR",
        category: "",
        note: "",
      });
    },
  });

  const del = useMutation({
    mutationFn: async (id: string) => api.delete(`/expenses/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["expenses"] }),
  });

  return (
    <div className="p-6 grid md:grid-cols-2 gap-6">
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-semibold mb-2">Add Expense</h2>
        <div className="grid gap-2">
          <input
            className="input"
            placeholder="Date (YYYY-MM-DD)"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
          <input
            className="input"
            placeholder="Amount"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
          />
          <input
            className="input"
            placeholder="Currency"
            value={form.currency}
            onChange={(e) => setForm({ ...form, currency: e.target.value })}
          />
          <input
            className="input"
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
          <input
            className="input"
            placeholder="Note"
            value={form.note}
            onChange={(e) => setForm({ ...form, note: e.target.value })}
          />
          <button onClick={() => add.mutate()} className="btn">
            Save
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-semibold mb-2">Recent Expenses</h2>
        <ul className="divide-y">
          {(data || []).map((e: any) => (
            <li key={e._id} className="py-2 flex items-center gap-2">
              <span className="w-28">
                {new Date(e.date).toLocaleDateString()}
              </span>
              <span className="flex-1">
                {e.category} — {e.amount} {e.currency}
              </span>
              <button
                className="text-red-600"
                onClick={() => del.mutate(e._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      <style>{`
        .input{border:1px solid #e5e7eb;padding:.6rem;border-radius:.5rem;width:100%}
        .btn{background:black;color:white;padding:.6rem;border-radius:.5rem}
      `}</style>
    </div>
  );
}
