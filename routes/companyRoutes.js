const express = require("express");
const router = express.Router();
const { createCompany } = require("../controller/companyController");
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

router.post("/", protect, authorizeRoles("recruiter"), createCompany);

module.exports = router;
