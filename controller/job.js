const axios = require("axios");

const basePath = "https://jobs.github.com/positions.json";

const getAllJob = async (req, res, next) => {
  try {
    const resp = await axios.get(basePath);
    //console.log(resp.data);
    res.status(200).json(resp.data);
  } catch (err) {
    console.log(err);

    return next(new HttpError("Something went wrong", 500));
  }
};

const searchJob = async (req, res, next) => {
  const { description, location, full_time } = req.query;
  try {
    const url = `${basePath}?${
      description ? `description=${description}` : ""
    }${location ? `${description ? "&" : ""}location=${location}` : ""}${
      full_time
        ? `${description || location ? "&" : ""}full_time=${full_time}`
        : ""
    }`;
    console.log(url);
    const resp = await axios.get(url);
    //console.log(resp.data);
    res.status(200).json(resp.data);
  } catch (err) {
    console.log(err);

    return next(new HttpError("Something went wrong", 500));
  }
};

const jobDetail = async (req, res, next) => {
  const { id } = req.params;
  try {
    const url = `https://jobs.github.com/positions/${id}.json`;
    console.log(url);
    const resp = await axios.get(url);

    res.status(200).json(resp.data);
  } catch (err) {
    console.log(err);
    return next(new HttpError("Something went wrong", 500));
  }
};

const jobPage = async (req, res, next) => {
  const { page, search } = req.query;
  try {
    const url = `${basePath}?${page ? `page=${page}` : ""}${
      search ? `${page ? "&" : ""}search=${search}` : ""
    }`;
    console.log(url);
    const resp = await axios.get(url);

    res.status(200).json(resp.data);
  } catch (err) {
    console.log(err);

    return next(new HttpError("Something went wrong", 500));
  }
};

exports.getAllJob = getAllJob;
exports.searchJob = searchJob;
exports.jobDetail = jobDetail;
