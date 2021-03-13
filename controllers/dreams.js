const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

const Dream = require('../models/Dream');

//?desc  Get all dreams
//?route  GET /api/v1/dreams

exports.getDreams = asyncHandler(async (req, res, next) => {
  const types = await Dream.schema.path('type').enumValues;

  res.status(200).json({
    success: true,
    data: types,
  });
});

exports.getAllDreams = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

//?desc  Get single dream
//?route  GET /api/v1/dreams/:id

exports.getDream = asyncHandler(async (req, res, next) => {
  const dream = await Dream.findById(req.params.id);

  if (!dream) {
    return next(new ErrorResponse(`Dream not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: dream,
  });
});

//?desc  Create new dream
//?route  POST /api/v1/dream/

exports.createDream = asyncHandler(async (req, res, next) => {
  // Check for already created dream
  const alreadyCreatedDream = await Dream.findOne({ title: req.body.title });

  // If the dream with same title already exists
  if (alreadyCreatedDream) {
    return next(
      new ErrorResponse(
        `The dream with the title ${req.body.title} already exists, create unique one`,
        400,
      ),
    );
  }

  const dream = await Dream.create(req.body);

  res.status(201).json({
    success: true,
    data: dream,
  });
});

//?desc  Update dream
//?route  PUT /api/v1/dreams/:id

exports.updateDream = asyncHandler(async (req, res, next) => {
  let dream = await Dream.findById(req.params.id);

  if (!dream) {
    return next(new ErrorResponse(`Dream not found with id of ${req.params.id}`, 404));
  }

  dream = await Dream.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: dream,
  });
});

//?desc  Delete dream
//?route  DELETE /api/v1/dreams/:id

exports.deleteDream = asyncHandler(async (req, res, next) => {
  const dream = await Dream.findById(req.params.id);

  if (!dream) {
    return next(new ErrorResponse(`Dream not found with id of ${req.params.id}`, 404));
  }

  dream.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});
