import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs  } from 'react-pdf';
import pdf from './assets/ThummimJungResume.pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
const resumeLink = "https://raw.githubusercontent.com/tjung97/website/main/portfolio/src/assets/ThummimJungResume.pdf";
const PDFViewer = () => {
   const [width, setWidth] = useState(1200);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);
 return (
 <Document file={resumeLink} className="d-flex justify-content-center">
    <Page pageNumber={1} scale={width > 786 ? 1.3 : 0.6} renderAnnotationLayer={false} renderTextLayer={false}/>
 </Document>
 );
};
export default PDFViewer;