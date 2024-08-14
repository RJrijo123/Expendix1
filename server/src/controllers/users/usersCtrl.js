const expressAsyncHandler = require("express-async-handler");
const generateToken = require("../../middlewares/generateToken");
const User = require("../../model/user");
//const { fetchAllIncCtrl } = require("../income/incomeCtrl");
//const { fetchAllExpCtrl } = require("../expenses/expenseCtrl");

// Register
const registerUser = expressAsyncHandler(async (req, res) => {
   const { email, firstname, lastname, password } = req?.body;
      // Check if user exists
      const userExists = await User.findOne({ email });
      if (userExists) throw new Error("User already exists");
      try {
      const user = await User.create({ email, firstname, lastname, password });
      res.status(200).json(user);
   } catch (error) {
      console.error(error);
      res.status(500).json('An error occurred'); // Handle the error and send an appropriate response
   }
}
);

//fetch all users
const fetchUsersctrl = expressAsyncHandler(async (req, res) => {
   try {
      const users = await User.find({});
      res.json(users);
   } catch (error) {
      res.json(error);
   }
   });

   //login user
 const loginUserCtrl = expressAsyncHandler(async (req, res) => {
      const { email, password } = req?.body;
     //find the user by email
     const userFound = await User.findOne({ email });
      //check if the user password matches)
      if (userFound && (await userFound?.isPasswordMatch(password))) {
         res.json({
            _id: userFound?._id,
            firstname: userFound?.firstname,
            lastname: userFound?.lastname,
            email: userFound?.email,
            isAdmin: userFound?.isAdmin,
            token: generateToken(userFound?._id),
         });
   }else{
      res.status(401);
      throw new Error("Inavlid Login credentials");
   }
 });

 //user profile
 const userProfileCtrl = expressAsyncHandler(async (req, res) => {
   try {
      const profile = await User.findById(req?.user?._id);
                                //.populate('expenses')
                                //.populate('income');
      res.json(profile);
   } catch (error) {
      res.json(error);
   }
});
// //user profile
// const userProfileCtrl = expressAsyncHandler(async (req, res) => {
//    try {
//       const profile = await User.findById(req?.user?._id)
//       const expenses = await fetchAllExpCtrl(req, res);
//       const incomes = await fetchAllIncCtrl(req, res);                     
//       const userProfileWithExpensesAndIncomes = {
//          user: profile,
//          expenses: expenses,
//          incomes: incomes
//      };

//      res.json(userProfileWithExpensesAndIncomes);
//  } catch (error) {
//      console.error(error);
//      res.status(500).json({ message: "Internal Server Error" });
//  }
// })


  //user profile update
 const updateUserCtrl = expressAsyncHandler(async (req, res) => {
   try{
      const profile = await User.findByIdAndUpdate(req?.user?._id, {
         firstname: req?.body?.firstname,
         lastname: req?.body?.lastname,
         email: req?.body?.email,
      },{
         new:true,
         runValidators:true,
      });
      res.json(profile);
   } catch (error) {
      res.json(error);
   }
 });
module.exports = { registerUser, fetchUsersctrl, loginUserCtrl, userProfileCtrl, updateUserCtrl };
