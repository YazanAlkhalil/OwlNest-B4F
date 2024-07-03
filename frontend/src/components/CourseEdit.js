import { useEffect, useState } from 'react'
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import Unit from './Unit';
import Lesson from './Lesson';
import FormDialog from './CreateUnitDialog'
import AdditionalInfo from './AdditionalInfo';
import UploadVideo from './UploadVideo';
import UploadPDF from './UploadPDF';
import CreateQuiz from './CreateQuiz';
import {useParams} from 'react-router-dom'
import toast from 'react-hot-toast';
import def from '../assets/images/default-course-thumbnail.png'



function CourseEdit() {
  const [isInfo, setIsInfo] = useState(false)
  const [isUploadingVideo, setIsUploadingVideo] = useState(false)
  const [isUploadingPDF, setIsUploadingPDF] = useState(false)
  const [createQuiz, setCreateQuiz] = useState(false)
  const [sortable, setSortable] = useState(false)
  const [content, setContent] = useState([])
  const [course,setCourse]= useState({
    name:"",
    description:"",
    image:""
  })
  const {id} = useParams()
  const getDetails = async ()=>{
    const res = await fetch(`http://localhost:5000/api/trainer/courses/${id}/content`,
      {
        credentials:'include'
      })
      const data = await res.json()
      if(!res.ok)
        toast.error(data.msg)
      else{
        setContent(data.content)
        setCourse({
          name: data.courseName,
          description: data.description,
          image: data.image ? data.image  : def,
        })
      }
  }
  useEffect(()=> {
    getDetails()
  },[])

  if (isInfo)
    return <AdditionalInfo close={() => setIsInfo(false)} />

  if (isUploadingVideo)
    return <UploadVideo getData={getDetails} submit={() => setIsUploadingVideo(false)} />
  if (isUploadingPDF)
    return <UploadPDF getData={getDetails} submit={() => setIsUploadingPDF(false)} />
  if (createQuiz)
    return <CreateQuiz getDetails={getDetails} submit={() => setCreateQuiz(false)} />

  function handleDragEnd(e) {
    const { active, over } = e
    if (active.id !== over.id) {
      setContent((items) => {
        const activeIndex = items.findIndex(item => item.id === active.id);
        const overIndex = items.findIndex(item => item.id === over.id);
        return arrayMove(items, activeIndex, overIndex);
      });
    }
  }
  async function addUnit(name) {
    const res = await fetch(`http://localhost:5000/api/trainer/courses/${id}/units`,{
      method: 'POST',
      credentials:'include',
      headers:{
        'Content-Type':"application/json"
      },
      body: JSON.stringify({
        title: name
      })
    })
    const data = await res.json()
    if(!res.ok){
      toast.error(data.msg)
    }
    else{
      getDetails()
    }
  }


  async function handleReorder(){
    if(sortable){
      const res= await fetch(`http://localhost:5000/api/trainer/courses/${id}/reorder`,{
        credentials:'include',
        method : 'PUT',
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({content})
      })
      const data = await res.json()
      if(res.ok){
        setSortable(false)
      }
      else{
        toast.error(data.msg)
      }
    }
    else
      setSortable(true)
  }


  return (
    <>
      <div className='flex justify-between '>
        <div className='flex w-full'>
          <img className='mr-4 rounded w-2/6' src={course.image} />
          <div className='flex-grow'>
            <h1 className='text-xl font-bold'>{course.name}</h1>
            <p className='mt-4 text-md font-light'>{course.description} </p>
          </div>
        </div>
        <div>
          <button className='text-xl border border-solid border-secondary px-3 py-2 hover:bg-secondary hover:text-white rounded  text-secondary' onClick={() => setIsInfo(true)}>
            info
          </button>
        </div>
      </div>
      <div className='flex justify-end mb-4'>
        <button onClick={handleReorder} className='mr-2 text-xl border border-solid border-secondary px-3 py-2 hover:bg-secondary hover:text-white rounded  text-secondary' >
          {sortable ? 'save' : 'reorder'}
        </button>
        <FormDialog addUnit={addUnit}/>
      </div>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div >

          <div >
            <SortableContext items={content} strategy={verticalListSortingStrategy}>
              {
              content.map((item) => {
                if (item.type == 'Unit')
                  return <Unit getDetails={getDetails} key={item.id} createQuiz={() => setCreateQuiz(true)} uploadVideo={() => setIsUploadingVideo(true)} uploadPDF={() => setIsUploadingPDF(true)} sortable={sortable} item={item} />
                else
                  return <Lesson getDetails={getDetails} sortable={sortable} key={item.id} item={item} />
              })}
            </SortableContext>
          </div>
        </div>
      </DndContext>
    </>
  )
}

export default CourseEdit
