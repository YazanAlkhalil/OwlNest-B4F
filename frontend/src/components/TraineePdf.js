import React from 'react'
import PdfViewer from './PdfViewer '
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

export default function TraineePdf() {
  return (
    <div>
      <PdfViewer />
    </div>
  )
}
