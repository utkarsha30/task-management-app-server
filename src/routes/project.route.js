const { Router } = require("express");
const projectCtrl = require("../controllers/project.controller");
const router = Router();

router.get("/", projectCtrl.getProjects);
router.post("/create", projectCtrl.createNewProject);
router.get("/:id", projectCtrl.getProjectById);
router.put("/:id", projectCtrl.updateProjectById);
router.delete("/:id", projectCtrl / projectCtrl.deleteProjectById);

module.exports = router;
