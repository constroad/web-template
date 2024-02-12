import { degrees, PDFDocument, StandardFonts, rgb } from 'pdf-lib'
// import htmlToPdf from 'html-pdf';


export const generateConstroadPDF = async () => {
  const url = 'https://constroad-portal.s3.us-east-2.amazonaws.com/plantilla_constroad_portal.pdf';
  
  const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())

  // Cargar el PDF desde el buffer
  const pdfDoc = await PDFDocument.load(existingPdfBytes);


  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
  
  const pages = pdfDoc.getPages()
  const firstPage = pages[0]
  const { width, height } = firstPage.getSize()

  firstPage.drawText('This text was added by jzena constroadt!', {
    x: 5,
    y: height / 2 + 300,
    size: 50,
    font: helveticaFont,
    color: rgb(0.95, 0.1, 0.1),
    rotate: degrees(-45),
  })

  const pdfBytes = await pdfDoc.save()

  return pdfBytes
}

export async function createQuotePdf(data: any): Promise<Uint8Array> {
  // Create a new PDFDocument
  const pdfDoc = await PDFDocument.create()

  // Embed the Times Roman font
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)

  // Add a blank page to the document
  const page = pdfDoc.addPage()

  // Get the width and height of the page
  const { width, height } = page.getSize()

  // Draw a string of text toward the top of the page
  const fontSize = 30
  page.drawText('Creating PDFs in JavaScript is awesome!', {
    x: 50,
    y: height - 4 * fontSize,
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0.53, 0.71),
  })

  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfBytes = await pdfDoc.save()
  return pdfBytes;
}

// export async function createHtmlToPdf(html: string): Promise<Buffer> {
//   // Convierte el HTML en PDF usando html-pdf
//   return new Promise((resolve, reject) => {
//     htmlToPdf.create(html).toBuffer((err, buffer) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(buffer);
//       }
//     });
//   });
// }

