const express = require("express");

const jobControlloer = require("../controller/job");

const router = express.Router();

router.get("/", jobControlloer.getAllJob);
router.get("/search", jobControlloer.searchJob);
router.get("/job_details/:id", jobControlloer.jobDetail);

module.exports = router;
