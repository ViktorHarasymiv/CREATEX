import React, { useRef } from "react";
import html2pdf from "html2pdf.js";

import "./PDF.css";

const PdfGenerator = () => {
  const contentRef = useRef();

  const generatePDF = () => {
    html2pdf()
      .set({
        margin: [10, 10, 10, 10],
        filename: "styled-document.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      })
      .from(document.getElementById("pdf-content"))
      .save();
  };

  return (
    <div>
      <div id="pdf-content" className="pdf-content " ref={contentRef}>
        <h1>HTML in PDF</h1>
        <p>Це приклад використання html2pdf.js in React.</p>
      </div>
      <button onClick={generatePDF}>Завантажити PDF</button>
    </div>
  );
};

export default PdfGenerator;
