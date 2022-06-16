const express = require("express")
const {registerUser, login, logout,updateProfile, forgotPassword, resetPassword, getUserDetails, updatePassword, getAllUser, getSingleUser} = require("../controller/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router =  express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(login);

router.route("/password/forget").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/me").get(isAuthenticatedUser ,getUserDetails);

router.route("/password/update").put(isAuthenticatedUser ,updatePassword);

router.route("/profile/update").put(isAuthenticatedUser ,updateProfile);

router.route("/logout").get(logout);

router.route("admin/users").get(isAuthenticatedUser ,authorizeRoles("admin") , getAllUser );

router.route("admin/user/:id").get(isAuthenticatedUser ,authorizeRoles("admin") , getSingleUser );


 module.exports = router
