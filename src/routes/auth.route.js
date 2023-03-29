const { Router } = require("express");
const employeeCtrl = require("../controllers/auth.controller");
const router = Router();
router.post("/register",employeeCtrl.registerNewEmployee);
router.post("/login",employeeCtrl.validateEmployee);
module.exports = router;