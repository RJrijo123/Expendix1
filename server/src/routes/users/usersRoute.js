const express = require('express');
const { registerUser, fetchUsersctrl, loginUserCtrl, userProfileCtrl, updateUserCtrl } = require('../../controllers/users/usersCtrl');
const authMiddleware = require('../../middlewares/authmiddleware');

const userRoute = express.Router();
userRoute.post('/register', registerUser);
userRoute.get('/profile',authMiddleware, userProfileCtrl);
userRoute.put('/update',authMiddleware, updateUserCtrl);
userRoute.post('/login', loginUserCtrl);
userRoute.get("/", authMiddleware, fetchUsersctrl);
module.exports = userRoute;
