import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useEffect, useRef, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { FaRegFilePdf } from "react-icons/fa6";
import { PiExam } from "react-icons/pi";
import { MdDelete } from 'react-icons/md';
import { useParams } from "react-router-dom";

function Unit({getDetails,item, sortable, uploadVideo, uploadPDF, createQuiz }) {
  const {id} = useParams()
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const overlayRef = useRef(null);

  const toggleOverlay = () => {
    localStorage.setItem('unitId',item.id)
    setOverlayVisible(!isOverlayVisible);
  };
  const handleClickOutside = (event) => {
    if (overlayRef.current && !overlayRef.current.contains(event.target)) {
      setOverlayVisible(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id  });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  async function handleDelete(){
    await fetch(`http://localhost:5000/api/trainer/courses/${id}/units/${item.id}`,{
      method:"DELETE",
      credentials:"include"
    })
    getDetails()    
  }

  if (!sortable) {
    return (
      <div className="relative mb-2 py-2 px-2 h-12 pl-1 rounded flex justify-between items-center">
        <div>
          
        <span className="text-2xl">{item.title} </span>
        </div>
        <div className="flex items-center">

        <button
          onClick={toggleOverlay}
          className="btn-inner h-18 p-2 "
        >
          add lesson
        </button>
        <MdDelete onClick={handleDelete} className='ml-2 hover:cursor-pointer box-content p-2  size-6 text-white rounded-full bg-red-300 hover:bg-red-500' />
        </div>
        <div
          ref={overlayRef}
          className={`${isOverlayVisible ? "block" : "hidden"
            } rounded z-10 bg-white shadow-xl border border-slate-50  absolute top-12 right-28`}
        >
          <div
            onClick={uploadVideo}
            className="flex items-center gap-3 hover:bg-slate-200 hover:cursor-pointer text-xl py-3 px-5"
          >
            <FaPlay />
            Video
          </div>
          <div
            onClick={uploadPDF}
            className="flex items-center gap-3 hover:bg-slate-200 hover:cursor-pointer text-xl py-3 px-5"
          >
            <FaRegFilePdf />
            PDF
          </div>
          <div
            onClick={createQuiz}
            className="flex items-center gap-3 hover:bg-slate-200 hover:cursor-pointer text-xl py-3 px-5"
          >
            <PiExam />
            Quiz
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="relative mb-2 pl-1 py-2 h-12 px-4 rounded flex justify-between items-center"
    >
      <span className="text-2xl">{item.title} </span>
    </div>
  );
}

export default Unit;
