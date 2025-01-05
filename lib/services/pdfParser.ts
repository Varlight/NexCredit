import { PDFDocument } from 'pdf-lib';

export async function parsePDF(buffer: ArrayBuffer): Promise<string> {
  const pdfDoc = await PDFDocument.load(buffer);
  const pages = pdfDoc.getPages();
  
  let text = '';
  for (const page of pages) {
    const content = await page.getTextContent();
    text += content + '\n';
  }
  
  return text;
}