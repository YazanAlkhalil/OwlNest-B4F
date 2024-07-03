import React, { useEffect,useState } from 'react'
import PdfViewer from './PdfViewer '
import { pdfjs } from 'react-pdf';
import { useParams } from 'react-router-dom';
import {toast}from 'react-hot-toast'
import { BiArrowBack } from "react-icons/bi";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();


export default function TraineePdf() {
  const [filename,setFilename]= useState()
  const {id}= useParams()
  const lessonId = localStorage.getItem('lessonId')
  useEffect(()=>{
    const getLesson = async ()=>{
      const res = await fetch(`http://localhost:5000/api/trainee/courses/${id}/lessons/${lessonId}`,{
        credentials:'include'
      })

      const data = await res.json()
      if(res.ok){
        setFilename(data.filename)
      }
      else{
        toast.error(data.message)
      }
    }
    getLesson()

  },[])
  return (
    <div>
      
      <PdfViewer filename={filename}/>
    </div>
  )
}
