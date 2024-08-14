import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slices/users/usersSlices";
import expensesReducer from "../slices/expenses/expenseSlices";
import incomeReducer from "../slices/income/incomeSlices";
import account from "../slices/accountStats/accountStatsSlices";

//import expenses from "../slices/expenses/expenseSlices";
//import income from "../slices/income/incomeSlices";
//import statistics from "../slices/accountStats/accountStatsSlices";
const store = configureStore({
  reducer: {
    users: usersReducer,
    expenses: expensesReducer,
    income: incomeReducer,
    account,
    //statistics,
  },
});

export default store;