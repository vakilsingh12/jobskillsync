const Application = require("../models/Application");

// Apply to Job
exports.applyJob = async (req, res) => {
  try {
    const { jobId, resumeUrl } = req.body;

    // check if already applied
    const alreadyApplied = await Application.findOne({
      job: jobId,
      applicant: req.user._id,
    });

    if (alreadyApplied) {
      return res.status(400).json({
        message: "You already applied for this job",
      });
    }

    const application = await Application.create({
      job: jobId,
      applicant: req.user._id,
      resumeUrl,
    });

    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      applicant: req.user._id,
    })
      .populate("job")
      .populate("applicant", "name email");

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getApplicantsForJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const applicants = await Application.find({
      job: jobId,
    }).populate("applicant", "name email");

    res.json(applicants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
