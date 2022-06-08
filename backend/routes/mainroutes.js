//const { Router } = require("express");

const express = require("express");
const maincontroller = require("../controllers/maincontroller");
const logincontroller = require("../controllers/logincontroller");
const router = express.Router();
const app = express();
const session=require('express-session')

router.route("/").get(maincontroller.check,maincontroller.profile);

router.route("/signup").get(maincontroller.checklogin,maincontroller.signup);
router.route("/signup").post(logincontroller.signup);

router.route("/signin").get( maincontroller.checklogin, maincontroller.signin);
router.route("/signin").post(logincontroller.signin);
router.route("/signout").get(logincontroller.signout);
router.route("/add").post(maincontroller.check,logincontroller.add);
router.route("/remove/:id").post(maincontroller.check,maincontroller.remove);
router.route("/edit/:id").get(maincontroller.check,maincontroller.edit);
router.route("/edit/:id").post(maincontroller.editmade);
router.route("/done/:id").post(maincontroller.done);

module.exports = router;