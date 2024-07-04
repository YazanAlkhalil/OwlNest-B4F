import React, { useState } from 'react'
import VideoDropzone from './VideoDropZone'
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

function UploadPDF({ submit,getData }) {
  const [name,setName]= useState('')
  const [file, setFile] = useState(null);
  const unitId = localStorage.getItem('unitId');
  const {id} = useParams()

  const handleFileChange = (uploadedFile) => {
    setFile(uploadedFile);
  };

  const handleSubmit = async () => {
    if (!file || !name ) {
      toast.error('Please fill in all fields and select a video file.');
      return;
    }

    const formData = new FormData();
    formData.append('pdf', file);
    formData.append('title', name);

    try {
      const response = await fetch(`http://localhost:5000/api/trainer/courses/${id}/units/${unitId}/lessons/pdf`, {
        method: 'POST',
        body: formData,
        credentials:"include"
      });

      if (!response.ok) {
        toast.error('something went wrong')
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      // Reset form fields after successful upload
      setName('');
      setFile(null);
      submit()
      getData()
    } catch (error) {
      console.error('Error uploading video:', error);
    }
  };
  return (
    <div className='flex flex-col'>
      <h1 className='text-3xl mb-4'>Enter lesson content</h1>
      <div className="flex w-min items-center border-b border-primary-500 py-2">
        <input value={name} onChange={e => setName(e.target.value)} className="text-xl appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="lesson name" aria-label="lesson name" />
      </div>
      <VideoDropzone type={{
        'application/pdf': ['.pdf'],
      }} onFileUploaded={handleFileChange}/>
      <button onClick={handleSubmit} className='bg-primary p-3 self-end text-white rounded mt-10 text-xl hover:bg-hover'>Submit</button>

    </div>
  )
}

export default UploadPDF
