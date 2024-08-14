const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const dbConnect = require('./config/dbConnect');
const { errorHandler, notFound } = require('./middlewares/errormiddleware');
const userRoute = require('./routes/users/usersRoute');
const incomeRoute = require('./routes/income/incomeRoutes');
const expenseRoute = require('./routes/expenses/expenseRoutes');
const accounStatsRoute = require('./routes/accountStatsRoute/accountStatsRoute');
//const accounStatstRoute = require('./routes/accountStatsRoute/accountStatsRoute');
const app = express();
//env
dotenv.config();
//dbConnect
dbConnect();

//middlewares
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
    res.json({ msg: "Welcome Expenses tracker API"});
 });
//users routes
app.use("/api/users", userRoute);
//account stats
app.use("/", accounStatsRoute);
//income routes
app.use("/api/income", incomeRoute);
//expenses routes
app.use("/api/expenses", expenseRoute);


//Error
app.use(notFound);
app.use(errorHandler);


module.exports = app;

