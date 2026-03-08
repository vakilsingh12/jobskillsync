const express = require("express");
const router = express.Router();

const {
  applyJob,
  getMyApplications,
  getApplicantsForJob,
} = require("../controller/applicationController");

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

// apply job
router.post("/apply", protect, applyJob);

// user applied jobs
router.get("/my", protect, getMyApplications);

// recruiter view applicants
router.get("/job/:jobId", protect,authorizeRoles("recruiter"), getApplicantsForJob);

module.exports = router;
