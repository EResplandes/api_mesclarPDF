const pdfService = require("../services/pdf.service");

async function mesclar(req, res, next) {
  try {
    const impostoFile = req.files.imposto[0];
    const controleFile = req.files.controle[0];

    const mergedPdf = await pdfService.mesclar(impostoFile, controleFile);

    res.setHeader("Content-Type", "application/pdf");
    res.send(Buffer.from(mergedPdf));
  } catch (err) {
    console.error(`Error while merging PDFs`, err.message);
    next(err);
  }
}

async function assinar(req, res, next) {
  try {
    const pedidoFile = req.files.pedido[0];

    const mergedPdf = await pdfService.assinar(pedidoFile, req);

    res.setHeader("Content-Type", "application/pdf");
    res.send(Buffer.from(mergedPdf));
  } catch (err) {
    console.error(`Error while merging PDFs`, err.message);
    next(err);
  }
}

module.exports = {
  mesclar,
  assinar,
};
