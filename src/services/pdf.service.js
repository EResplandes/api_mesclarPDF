const { PDFDocument } = require("pdf-lib");
const fs = require("fs").promises;

async function mesclar(arquivoImposto, arquivoControle) {
  try {
    const pdfBytesImposto = await fs.readFile(arquivoImposto.path);
    const pdfBytesControle = await fs.readFile(arquivoControle.path);

    const documentoPdf = await PDFDocument.create();
    const docPdfImposto = await PDFDocument.load(pdfBytesImposto);
    const docPdfControle = await PDFDocument.load(pdfBytesControle);

    const paginasImposto = await documentoPdf.copyPages(
      docPdfImposto,
      docPdfImposto.getPageIndices()
    );
    const paginasControle = await documentoPdf.copyPages(
      docPdfControle,
      docPdfControle.getPageIndices()
    );

    paginasImposto.forEach((pagina) => documentoPdf.addPage(pagina));
    paginasControle.forEach((pagina) => documentoPdf.addPage(pagina));

    const bytesPdfMesclado = await documentoPdf.save();

    return bytesPdfMesclado;
  } catch (erro) {
    throw new Error("Problemas ao mesclar PDF!");
  }
}

module.exports = {
  mesclar,
};
