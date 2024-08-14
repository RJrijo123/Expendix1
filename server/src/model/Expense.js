const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

//create schema
const expensSchema = new mongoose.Schema(
  {
    title: {
      required: [true, "Title is required"],
      type: String,
    },
    description: {
      required: [true, "Description is required"],
      type: String,
    },
    type: {
      type: String,
      default: "expense",
    },

    amount: {
      type: Number,
      required: [true, "Amount is required"],
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, //must be mongodb id
        ref: "User",
        required: [true, "User ID is required"],
    },
  
  },
  { 
    timestamps: true,
    toJSON: { 
      virtuals: true 
    },
    toObject: {
       virtuals: true 
      },
    timestamps: true,
  }
);

//pagination
expensSchema.plugin(mongoosePaginate);
const Expense = mongoose.model("expense", expensSchema);
module.exports = Expense;