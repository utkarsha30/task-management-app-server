const { Router } = require("express");
const projectCtrl = require("../controllers/project.controller");
const { authenticate, authorize } = require("../middleware/auth");
const router = Router();

router.post("/", authenticate, authorize("admin"), projectCtrl.createProject);
router.get("/:id", authenticate, projectCtrl.getProjectById);
router.put("/:id", authenticate, authorize("admin"), projectCtrl.updateProject);
router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  projectCtrl.deleteProject
);
router.post(
  "/:id/contributors",
  authenticate,
  authorize("admin"),
  projectCtrl.addContributor
);
router.delete(
  "/:id/contributors",
  authenticate,
  authorize("admin"),
  projectCtrl.removeContributor
);

module.exports = router;
