const express = require("express");
const router = express.Router();
const pdfController = require("../controllers/pdf.controller");
const multer = require("multer");

const upload = multer({ dest: "uploads/" }); // Pasta onde os arquivos serão temporariamente armazenados

/* POST mesclar pdf */
router.post(
  "/mesclar-pdf",
  upload.fields([{ name: "imposto" }, { name: "controle" }]),
  pdfController.mesclar
);

/* POST assinar pdf */
router.post(
  "/assinar-pdf",
  upload.fields([{ name: "pedido" }]),
  pdfController.assinar
);

module.exports = router;
