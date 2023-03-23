const { Router } = require("express");
const employeeCtrl = require("../controllers/employee.controller");
const router = Router();

router.post("/register",employeeCtrl.registerNewEmployee);
module.exports = router;