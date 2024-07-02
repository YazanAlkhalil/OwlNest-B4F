import React, { useEffect, useRef, useState } from 'react'
import VideoDropzone from './VideoDropZone'
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

function UploadVideo({ submit,getData }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const textareaRef = useRef(null);
  const unitId = localStorage.getItem('unitId');
  const {id} = useParams()
  useEffect(() => {
    const adjustHeight = () => {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight + 2}px`;
    };

    adjustHeight();

    const textarea = textareaRef.current;
    textarea.addEventListener('input', adjustHeight);

    return () => {
      textarea.removeEventListener('input', adjustHeight);
    };
  }, []);


  const handleFileChange = (uploadedFile) => {
    setFile(uploadedFile);
  }


  const handleSubmit = async () => {
    if (!file || !name || !description) {
      toast.error('Please fill in all fields and select a video file.');
      return;
    }

    const formData = new FormData();
    formData.append('video', file);
    formData.append('title', name);
    formData.append('description', description);

    try {
      const response = await fetch(`http://localhost:5000/api/trainer/courses/${id}/units/${unitId}/lessons/video`, {
        method: 'POST',
        credentials:"include",
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Upload successful:', data);
      setName('');
      setDescription('');
      setFile(null);
      submit()
      getData()
    } catch (error) {
      console.error('Error uploading video:', error);
    }
  };

  return (
    <div className='flex flex-col '>
      <h1 className='text-3xl mb-4'>Enter lesson content</h1>
      <div className="flex w-min items-center border-b border-primary-500 py-2">
        <input value={name} onChange={e => setName(e.target.value)} className="text-xl appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="lesson name" aria-label="lesson name" />
      </div>
      <VideoDropzone type={{
        'video/*': ['.mp4', '.mov', '.avi', '.mkv'],
      }} onFileUploaded={handleFileChange}/>
      <h1>Add a description</h1>
      <textarea
        className='p-2 border-solid border border-gray-400'
        ref={textareaRef}
        rows="4"
        placeholder="Description..."
        style={{ resize: 'none' }}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleSubmit} className='bg-primary p-3 self-end text-white rounded mt-10 text-xl hover:bg-hover'>Submit</button>
    </div>
  )
}

export default UploadVideo
