const express = require("express");
const router = express.Router();
const { createJob, getJobs } = require("../controller/jobController");
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

router.post("/", protect, authorizeRoles("recruiter"), createJob);
router.get("/", getJobs);

module.exports = router;
