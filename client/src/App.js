import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/users/Login/Login";
import Register from "./pages/users/Register/Register";
import AddIncome from "./pages/income/AddIncome";
import AddExpense from "./pages/expense/AddExpense";
import Profile from "./pages/users/Profile";
import Navbar from "./components/Navigation/Navbar";
import ProtectedRoute from "./components/Navigation/ProtectedRoute";
import NotAdmin from "./components/NotAdmin";
import DashboardData from "./pages/users/DashboardData";
import ExpensesList from "./pages/expense/ExpensesList";
//import EditExpense from "./pages/expense/EditExpense";
import IncomeList from "./pages/income/IncomeList";
import EditContent from "./components/EditContent";
import UserProfileExpList from "./pages/users/UserProfileExpList.";
import UserProfileIncList from "./pages/users/UserProfileIncList";
import UpdateProfile from "./pages/users/UpdateProfile";
import Footer from "./pages/footer/footer";

//import EditIncome from "./pages/income/EditIncome";


function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={<ProtectedRoute path="/dashboard" element={<DashboardData />} />}
          /> 
          {/*<Route path="/dashboard" element={<DashboardData />} />*/}
          <Route path="/not-found" element={<NotAdmin />} />
          <Route
            path="/expenses"
            element={<ProtectedRoute path="/expenses" element={<ExpensesList />} />}
          />
          <Route
            path="/incomes"
            element={<ProtectedRoute path="/incomes" element={<IncomeList />} />}
          />
          <Route
            path="/edit"
            element={<ProtectedRoute path="/edit" element={<EditContent />} />}
          />
          <Route
            path="/update-profile"
            element={<ProtectedRoute path="/update-profile" element={<UpdateProfile />} />}
          />
          <Route
            path="/user-expenses"
            element={<ProtectedRoute path="/user-expenses" element={<UserProfileExpList />} />}
          />
          <Route
            path="/user-income"
            element={<ProtectedRoute path="/user-income" element={<UserProfileIncList />} />}
          />
         {/* <Route
            path="/edit-income"
            element={<ProtectedRoute path="/edit-income" element={<EditIncome />} />}
  />  */}
          <Route
            path="/add-income"
            element={<ProtectedRoute path="/add-income" element={<AddIncome />} />}
          />
          <Route
            path="/add-expense"
            element={<ProtectedRoute path="/add-expense" element={<AddExpense />} />}
          />
          <Route
            path="/profile"
            element={<ProtectedRoute path="/profile" element={<Profile />} />}
          />
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
