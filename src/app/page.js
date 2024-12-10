// app/page.js
import DraggableForm from './Components/DraggableForm'

export default function Home() {
  return (
    <div className='flex justify-center items-center h-full'>
      <div className='w-[640px] h-full'>
        <DraggableForm />
      </div>
    </div>
  );
}
