const expressAsyncHandler = require("express-async-handler");
const Income = require("../../model/Income");
const Expense = require("../../model/Expense");


const accountStatsCtrl = expressAsyncHandler(async (req, res) => {
    try {
        //expense stats

    const expenseStats = await Expense.aggregate([
        //filter 
        { $match: { amount: { $gte: 0 } } },
        {
            $group: {
                _id: null,
                averageExp: { $avg: "$amount" },
                totalExp: { $sum: "$amount" },
                minExp: { $min: "$amount" },
                maxExp: { $max: "$amount" },
                totalRecordsExp: { $sum: 1 },
            },
        },
    ]);

    //income stats

    const incomeStats = await Income.aggregate([
        //filter 
        { $match: { amount: { $gte: 0 } } },
        {
            $group: {
                _id: null,
                averageIncome: { $avg: "$amount" },
                totalIncome: { $sum: "$amount" },
                minIncome: { $min: "$amount" },
                maxIncome: { $max: "$amount" },
                totalRecordsIncome: { $sum: 1 },
            },
        },
    ]);

    res.json({ expenseStats, incomeStats });
    } catch (error) {
        res.json(error);
    }
});

module.exports = accountStatsCtrl;