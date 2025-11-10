import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/client";
import { useAuth } from "../hooks/useAuth";

export default function Goals() {
  const user = useAuth();
  const qc = useQueryClient();

  const { data } = useQuery({
    queryKey: ["goals"],
    queryFn: async () => (await api.get("/goals")).data,
  });

  const [form, setForm] = useState({
    title: "",
    targetAmount: "",
    currentAmount: "",
    deadline: "",
  });

  const add = useMutation({
    mutationFn: async () =>
      api.post("/goals", {
        ...form,
        targetAmount: Number(form.targetAmount),
        currentAmount: Number(form.currentAmount),
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["goals"] });
      setForm({ title: "", targetAmount: "", currentAmount: "", deadline: "" });
    },
  });

  return (
    <div className="p-6 grid md:grid-cols-2 gap-6">
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-semibold mb-2">Set Goal</h2>
        <div className="grid gap-2">
          <input
            className="input"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <input
            className="input"
            placeholder="Target Amount"
            value={form.targetAmount}
            onChange={(e) => setForm({ ...form, targetAmount: e.target.value })}
          />
          <input
            className="input"
            placeholder="Current Amount"
            value={form.currentAmount}
            onChange={(e) => setForm({ ...form, currentAmount: e.target.value })}
          />
          <input
            className="input"
            placeholder="Deadline (YYYY-MM-DD)"
            value={form.deadline}
            onChange={(e) => setForm({ ...form, deadline: e.target.value })}
          />
          <button onClick={() => add.mutate()} className="btn">
            Save
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-semibold mb-2">Goals</h2>
        <ul className="divide-y">
          {(data || []).map((g: any) => (
            <li key={g._id} className="py-2">
              <span className="font-medium">{g.title}</span> —{" "}
              <span>
                {g.currentAmount}/{g.targetAmount} (INR)
              </span>
              <div className="text-sm text-gray-500">
                Deadline: {new Date(g.deadline).toLocaleDateString()}
              </div>
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
