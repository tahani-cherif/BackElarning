const exercicemodel = require("../models/exerciceModel");
const courmodel = require("../models/courModel");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");

// @desc    Get all exercice
// @route   GET api/exercice/
// @access  Private
exports.getexercices = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const exercice = await exercicemodel.find({});
  res.status(200).json({ results: exercice.length, page, data: exercice });
});

// @desc    Get specific exercice by d
// @route   GET api/exercice/:id
// @access  Private
exports.getexercice = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const exercice = await exercicemodel.findById(id);
  if (!exercice) {
    return next(new ApiError(`exercice not found for this id ${id}`, 404));
  }
  res.status(200).json({ data: exercice });
});

// @desc    Create a new exercice
// @route   POST api/exercice/
// @access  Private
exports.createexercice = asyncHandler(async (req, res) => {
  const body = req.body;
  body.file = req.file.path;
  const exercice = await exercicemodel.create(body);
  const cour = await courmodel.findById(body.course);
  cour.pdfId.push(exercice._id);
  await courmodel.findByIdAndUpdate(body.course, cour);
  res.status(201).json({ data: exercice });
});

// @desc    update specified exercice
// @route   PUT api/exercice/:id
// @access  Private
exports.updateexercice = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  req.body.file = req?.file?.path || req.body.file;
  const exercice = await exercicemodel.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  }); //return apre update
  if (!exercice) {
    return next(new ApiError(`exercice not found for this id ${id}`, 404));
  }
  res.status(200).json({ data: exercice });
});
