const express = require("express");
const {
  getexerciceValidator,
  createexerciceValidator,
  updateexerciceValidator,
} = require("../utils/validators/exerciceValidator");

const {
  getexercices,
  createexercice,
  getexercice,
  updateexercice,
} = require("../services/exerciceService");

const router = express.Router();
const { upload } = require("../middlewares/imageMiddmeware");

router
  .route("/")
  .get(getexercices)
  .post(
    upload("./exercice").single("file"),
    createexerciceValidator,
    createexercice
  );

router
  .route("/:id")
  .get(getexerciceValidator, getexercice)
  .put(
    upload("./exercice").single("file"),
    updateexerciceValidator,
    updateexercice
  );

module.exports = router;
