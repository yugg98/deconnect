const express = require("express");
const {registerUser,loginUser,logout,forgotPassword,postsg,resetPassword,updateAvatar,updateBanner, getUserDetails,updatePassword,follow,findUser,setAbout,setSkill,Acceptlink ,setExperience,setEducation,checkToken,me,Myposts,link,userFeed} = require("../controllers/userControlers");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logout);
router.route("/in/:id").get(getUserDetails);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);
router.route("/me/updateAvatar").post( updateAvatar);
router.route("/me/updateBanner").post( updateBanner);
router.route("/follow").post(follow);
router.route("/me").post(me);
router.route("/Searchuser/:keyword").get(findUser);
router.route('/about').post(setAbout)
router.route('/skill').post(setSkill)
router.route('/Education').post(setEducation)
router.route('/Experience').post(setExperience)
router.route('/checkToken').post(checkToken)
router.route('/myPost').post(Myposts)
router.route('/link').post(link)
router.route('/acceptlink').post(Acceptlink)
router.route('/userFeed').post(userFeed)
router.route('/getPosts').post(postsg)


module.exports = router;