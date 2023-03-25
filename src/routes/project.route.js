const { Router } = require("express");
const projectCtrl = require("../controllers/project.controller");
const router = Router();

router.post("/create", projectCtrl.createNewProject);
module.exports = router;
