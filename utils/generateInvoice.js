import PDFDocument from "pdfkit";
import fs from "fs";

const generateInvoice = (bookingData, path) => {
  const doc = new PDFDocument({ margin: 50 });

  // Pipe the PDF into a writable stream
  doc.pipe(fs.createWriteStream(path));

  // Document Header
  doc
    .fontSize(20)
    .text("Travel Agency Invoice", { align: "center" })
    .moveDown();

  // Booking Info
  doc
    .fontSize(12)
    .text(`Invoice Number: ${bookingData.invoiceNumber}`)
    .text(`Booking Date: ${new Date(bookingData.date).toLocaleDateString()}`)
    .moveDown();

  // User Info
  doc.text(`Name: ${bookingData.userName}`);
  doc.text(`Email: ${bookingData.userEmail}`);
  doc.moveDown();

  // Tour Info
  doc.text(`Tour Package: ${bookingData.tourPackage}`);
  doc.text(`Tour Date: ${new Date(bookingData.tourDate).toLocaleDateString()}`);
  doc.text(`Number of Guests: ${bookingData.guests}`);
  doc.moveDown();

  // Price Details
  doc
    .fontSize(14)
    .text(`Total Price: $${bookingData.totalPrice.toFixed(2)}`, { align: "right" });

  doc.end();
};

export default generateInvoice;
