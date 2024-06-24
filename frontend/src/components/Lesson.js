import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FaPlay } from "react-icons/fa";
import { FaRegFilePdf } from "react-icons/fa6";
import { PiExam } from "react-icons/pi";
import { MdDelete } from 'react-icons/md';

function getIcon(icon) {
  if (icon == 'video')
    return <FaPlay className=" size-5 p-2 box-content" />
  else if (icon == 'pdf')
    return <FaRegFilePdf className=" size-5 p-2 box-content" />
  else
    return <PiExam className=" size-5 p-2 box-content" />
}

function Lesson({ item, sortable }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  }
  if (!sortable) {
    return <div
      className='bg-gray-50 hover:cursor-pointer hover:bg-gray-200 text-black border flex justify-between items-center mb-2 p-2 rounded'>
      <div className="flex items-center">
        {getIcon(item.content)}
        <h4 className='ml-2 text-xl'>{item.name}</h4>
      </div>
      <MdDelete onClick={{}} className='ml-2 hover:cursor-pointer box-content p-2  size-6 text-white rounded-full bg-red-300 hover:bg-red-500' />
    </div>
  }
  return <div style={style} ref={setNodeRef} {...attributes} {...listeners}
    className='bg-gray-50  text-black border flex items-center mb-2 p-2 rounded'>
    {getIcon(item.content)}
    <h4 className='ml-2 text-xl'>{item.name}</h4>
  </div>
}
export default Lesson;