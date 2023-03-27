const router = require("express").Router()
const { body, validationResult } = require('express-validator')
const { createUser,login, following, followerPost, updateProfile, deleteUser, userDetailPost, userToFollow, verifyEmail, forgotPassword, resetPassword, getAllUsers, getUsered, UpdateProfiles } = require('../controllers/userController')
const { verifyToken } = require("../middlewares/verifyToken")


router.post("/create/user",
       body('email').isEmail(), 
       body('password').isLength({ min: 6 }), 
       body('username').isLength({ min: 3 }),
       body('phonenumber').isLength({ min: 10 }), createUser)

//verfiy email
router.post("/verify/email",verifyEmail)

//login
router.post("/login",
       body('email').isEmail(), 
       body('password').isLength({ min: 6 }),login)

//forget Password
router.post("/forgot/password",forgotPassword)

//reset passwrd
router.put("/reset/password",resetPassword)

//follow
router.put("/follow/:id",verifyToken,following)

// get post from follwers
router.get("/followerpost/:id",verifyToken,followerPost)

// update profile
router.put("/update/:id",verifyToken, updateProfile)

//user delete
router.delete("/delete/:id",verifyToken,deleteUser)

//get user details for post
router.get("/post/user/details/:id",userDetailPost)

//get user to follow
router.get("/all/user/:id",userToFollow)

//get all users
router.get("/get/users",getAllUsers)

//get user
router.get("/get/usered",verifyToken,getUsered)

//updatee profile pic
router.patch('/users/:id/profile',verifyToken,UpdateProfiles)

//reject report


module.exports = router