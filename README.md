<div align="center">
  <img src="https://img.icons8.com/color/96/money-bag.png" width="80" />
  <h1>💰 BudgetWise</h1>
  <p><b>Smart Finance Tracker for Budgets, Goals & Expenses</b></p>

  <p>
    <a href="https://budget-wise-cyan.vercel.app/login" target="_blank">
      🌐 Live Frontend
    </a> |
    <a href="https://budgetwise-api-r18v.onrender.com" target="_blank">
      ⚙️ Live Backend API
    </a>
  </p>

  <img src="https://img.shields.io/badge/Frontend-Vercel-black?logo=vercel" />
  <img src="https://img.shields.io/badge/Backend-Render-blue?logo=render" />
  <img src="https://img.shields.io/badge/Stack-MERN-green" />
  <img src="https://img.shields.io/badge/TypeScript-Ready-blue?logo=typescript" />
  <img src="https://img.shields.io/badge/License-MIT-yellow" />
</div>

---

## 📘 About the Project
**BudgetWise** is a full-stack personal finance manager that helps users:
- Track daily **expenses** 🧾  
- Create and monitor **budgets** 📊  
- Set **financial goals** 🎯  
- View **analytics and spending by category** in real-time  

It’s built using the **MERN stack** with TypeScript and styled using TailwindCSS for a clean, responsive UI.

---

## 🚀 Live Demo
- **Frontend:** [https://budget-wise-cyan.vercel.app/login](https://budget-wise-cyan.vercel.app/login)
- **Backend API:** [https://budgetwise-api-r18v.onrender.com](https://budgetwise-api-r18v.onrender.com)

---

## 🧠 Tech Stack

### ⚡ Frontend
- React + TypeScript + Vite  
- React Query (for data fetching and caching)  
- TailwindCSS  
- Axios  

### 🔥 Backend
- Node.js + Express  
- MongoDB + Mongoose  
- JWT Authentication  
- Zod for validation  
- Cookie-based authentication  
- dotenv for environment configs  

### ☁️ Deployment
- Frontend → **Vercel**  
- Backend → **Render**

---

## 🔑 Demo Credentials
Use these credentials to test the live app:

Email: dev2001@gmail.com
Password: 123456


---

## 🧩 Features

✅ **Authentication System**  
Secure user login, registration, and session handling with JWT and cookies.

✅ **Expense Tracking**  
Add, view, and delete expenses with categories, notes, and date support.

✅ **Budget Management**  
Define monthly or category-based budgets.

✅ **Goal Setting**  
Set personal financial goals with target & current amounts.

✅ **Analytics Dashboard**  
Interactive summary of budgets, active goals, and category-wise spending chart.

✅ **Real-Time Updates**  
Frontend uses React Query for instant UI refreshes after any CRUD operation.

✅ **Responsive UI**  
Clean Tailwind design that adapts to all screen sizes.

---

## ⚙️ Setup Instructions (Local Development)

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Abhinav07072001/BudgetWise.git
cd BudgetWise
```
2️⃣ Backend Setup
```bash
cd backend
npm install
```
Create a .env file inside /backend and add:
```bash
PORT=8080
CORS_ORIGIN=http://localhost:5173
MONGO_URI=your_mongodb_uri_here
JWT_ACCESS_SECRET=supersecretjwt
ACCESS_TOKEN_TTL=15m
```
Run locally:
```bash
npm run dev
```
3️⃣ Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```
The app will start at http://localhost:5173

📊 Folder Structure
```bash
BudgetWise/
├── backend/
│   ├── src/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── index.ts
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/
    ├── src/
    │   ├── pages/
    │   ├── api/
    │   ├── components/
    │   └── App.tsx
    ├── package.json
    └── vite.config.ts
```
🧑‍💻 Developer

Developed by Abhinav Dixit

🚀 Full Stack Developer | MERN | TypeScript | Problem Solver

🌐 Connect with me:

GitHub :  https://github.com/Abhinav07072001

LinkedIn : https://www.linkedin.com/in/abhinavdixit771/

<div align="center"> <b>💚 Built with passion for clean UI, solid backend, and smart financial management.</b> </div> ```
