import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/client";
import { useAuth } from "../hooks/useAuth";

export default function Budgets() {
  const user = useAuth();
  const qc = useQueryClient();

  const { data } = useQuery({
    queryKey: ["budgets"],
    queryFn: async () => (await api.get("/budgets")).data,
  });

  const [form, setForm] = useState({
    category: "",
    limit: "",
    period: "monthly",
  });

  const add = useMutation({
    mutationFn: async () =>
      api.post("/budgets", { ...form, limit: Number(form.limit) }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["budgets"] });
      setForm({ category: "", limit: "", period: "monthly" });
    },
  });

  return (
    <div className="p-6 grid md:grid-cols-2 gap-6">
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-semibold mb-2">Create Budget</h2>
        <div className="grid gap-2">
          <input
            className="input"
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
          <input
            className="input"
            placeholder="Limit"
            value={form.limit}
            onChange={(e) => setForm({ ...form, limit: e.target.value })}
          />
          <select
            className="input"
            value={form.period}
            onChange={(e) => setForm({ ...form, period: e.target.value })}
          >
            <option value="monthly">Monthly</option>
            <option value="weekly">Weekly</option>
          </select>
          <button onClick={() => add.mutate()} className="btn">
            Save
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-semibold mb-2">Budgets</h2>
        <ul className="divide-y">
          {(data || []).map((b: any) => (
            <li key={b._id} className="py-2 flex justify-between">
              <span>{b.category}</span>
              <span>{b.limit} ({b.period})</span>
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
