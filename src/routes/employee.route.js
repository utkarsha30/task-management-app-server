const { Router } = require("express");
const employeeCtrl = require("../controllers/employee.controller");
const { authenticate, authorize } = require("../middleware/auth");
const router = Router();

router.get("/",authenticate,employeeCtrl.findEmployee);
module.exports = router;