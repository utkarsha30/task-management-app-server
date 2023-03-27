const { Router } = require("express");
const projectCtrl = require("../controllers/project.controller");
const router = Router();

router.post("/", projectCtrl.createProject);
router.get("/:id", projectCtrl.getProjectById);
router.put("/:id", projectCtrl.updateProject);
router.delete("/:id", projectCtrl.deleteProject);
router.post("/:id/contributors", projectCtrl.addContributor);
router.delete("/:id/contributors", projectCtrl.removeContributor);

module.exports = router;
