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

async function assinar(arquivoPedido, req) {
  try {
    const pdfBytes = await fs.readFile(arquivoPedido.path);
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const { assinante, cargo } = req.body;

    // Obter a primeira página do PDF
    const page = pdfDoc.getPage(0);

    if (cargo == "Gerente") {
      // Adicionar texto na página
      page.drawText(assinante, {
        x: 38,
        y: 120,
        size: 8,
      });
    } else if (cargo == "Diretor") {
      // Adicionar texto na página
      page.drawText(assinante, {
        x: 175,
        y: 120,
        size: 8,
      });
    }

    const pdfBytesEditado = await pdfDoc.save();
    return pdfBytesEditado;
  } catch (erro) {
    throw new Error("Problemas ao assinar PDF: " + erro.message);
  }
}

module.exports = {
  mesclar,
  assinar,
};
