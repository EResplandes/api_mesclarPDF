const express = require("express");
const router = express.Router();
const pdfController = require("../controllers/pdf.controller");
const multer = require("multer");

const upload = multer({ dest: "uploads/" }); // Pasta onde os arquivos serão temporariamente armazenados

/* POST programming language */
router.post(
  "/mesclar-pdf",
  upload.fields([{ name: "imposto" }, { name: "controle" }]),
  pdfController.mesclar
);

module.exports = router;
