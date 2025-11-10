// import { useQuery } from "@tanstack/react-query";
// import { api } from "../api/client";
// import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
// import { useAuth } from "../hooks/useAuth";

// export default function Dashboard() {
//   useAuth();

//   const { data: summary } = useQuery({
//     queryKey: ["summary"],
//     queryFn: async () => (await api.get("/analytics/summary")).data,
//   });

//   const { data: categories } = useQuery({
//     queryKey: ["categories"],
//     queryFn: async () => (await api.get("/analytics/categories")).data,
//   });

//   const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#9C27B0", "#E91E63"];

//   return (
//     <div className="p-6 grid gap-6 md:grid-cols-2">
//       {/* Summary Cards */}
//       <div className="grid gap-4">
//         <div className="bg-white shadow rounded-xl p-4">
//           <h2 className="text-lg font-semibold mb-2">Total Expenses</h2>
//           <p className="text-2xl font-bold">₹ {summary?.totalExpenses || 0}</p>
//         </div>
//         <div className="bg-white shadow rounded-xl p-4">
//           <h2 className="text-lg font-semibold mb-2">Budgets Created</h2>
//           <p className="text-2xl font-bold">{summary?.budgets?.length || 0}</p>
//         </div>
//         <div className="bg-white shadow rounded-xl p-4">
//           <h2 className="text-lg font-semibold mb-2">Goals Active</h2>
//           <p className="text-2xl font-bold">{summary?.goals?.length || 0}</p>
//         </div>
//       </div>

//       {/* Category Chart */}
//       <div className="bg-white shadow rounded-xl p-4">
//         <h2 className="text-lg font-semibold mb-4 text-center">Spending by Category</h2>
//         <div className="h-64">
//           <ResponsiveContainer width="100%" height="100%">
//             <PieChart>
//               <Pie
//                 data={categories || []}
//                 dataKey="total"
//                 nameKey="category"
//                 cx="50%"
//                 cy="50%"
//                 outerRadius={100}
//                 label
//               >
//                 {(categories || []).map((entry: any, index: number) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Tooltip />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useQuery } from "@tanstack/react-query";
import { api } from "../api/client";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useAuth } from "../hooks/useAuth";

export default function Dashboard() {
  useAuth();

  const { data: summary } = useQuery({
    queryKey: ["summary"],
    queryFn: async () => (await api.get("/analytics/summary")).data,
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => (await api.get("/analytics/categories")).data,
  });

  const COLORS = ["#6366F1", "#10B981", "#F59E0B", "#EF4444", "#3B82F6", "#8B5CF6"];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">📊 Dashboard Overview</h1>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Card: Total Expenses */}
        <div className="bg-white shadow-lg rounded-2xl p-5 hover:shadow-xl transition-all">
          <h2 className="text-gray-500 text-sm font-semibold mb-2">Total Expenses</h2>
          <p className="text-3xl font-bold text-gray-900">
            ₹ {summary?.totalExpenses?.toLocaleString() || 0}
          </p>
        </div>

        {/* Card: Budgets */}
        <div className="bg-white shadow-lg rounded-2xl p-5 hover:shadow-xl transition-all">
          <h2 className="text-gray-500 text-sm font-semibold mb-2">Budgets Created</h2>
          <p className="text-3xl font-bold text-gray-900">{summary?.budgets?.length || 0}</p>
        </div>

        {/* Card: Goals */}
        <div className="bg-white shadow-lg rounded-2xl p-5 hover:shadow-xl transition-all">
          <h2 className="text-gray-500 text-sm font-semibold mb-2">Goals Active</h2>
          <p className="text-3xl font-bold text-gray-900">{summary?.goals?.length || 0}</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white mt-8 p-6 rounded-2xl shadow-lg">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Spending by Category</h2>
        {(!categories || categories.length === 0) ? (
          <p className="text-gray-500 text-center py-10">No expenses yet to visualize.</p>
        ) : (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categories}
                  dataKey="total"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  label
                >
                  {categories.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
