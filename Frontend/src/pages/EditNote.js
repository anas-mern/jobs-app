import NavBar from '../components/NavBar'
import NoteForm from '../components/NoteForm'

export default function EditJob() {
  return (
    <div className='bg-dark' style={{minHeight:'100vh'}}>
      <NavBar />
      <NoteForm type="Edit"/>
    </div>
  )
}
