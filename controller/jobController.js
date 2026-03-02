const Job = require("../models/Job");

// Create Job
exports.createJob = async (req, res) => {
  try {
    const {
      companyId,
      title,
      description,
      location,
      salaryMin,
      salaryMax,
      experienceRequired,
      jobType,
    } = req.body;

    const job = await Job.create({
      company: companyId,
      createdBy: req.user._id,
      title,
      description,
      location,
      salaryMin,
      salaryMax,
      experienceRequired,
      jobType,
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Jobs (Public)
exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ status: "open" })
      .populate("company", "name location")
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
