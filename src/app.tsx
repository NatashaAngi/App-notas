 import { ChangeEvent, useState } from 'react'
import logo from './assets/naty.png'
import { NewNote } from './components/new-note'
import { NoteCard } from './components/note-card'
 
interface Note{
  id:string,  
  date : Date,
  content:string
}


 export function App() {


  const [pesquisa,setPesquisa] = useState('')

  const[notes,setNotes]=useState<Note[]>(()=> {

    const NotesOnStorage =localStorage.getItem('notes')

    if(NotesOnStorage){ return JSON.parse(NotesOnStorage) }
    
    return []})


  function notaCriada(content:string){const novaNota = { id:crypto.randomUUID() , date:new Date(),content,}

  const notesArray = [novaNota, ...notes]

  setNotes(notesArray)

  localStorage.setItem('notes', JSON.stringify(notesArray))

  }


function apagarNota(id:string){ const notesArray = notes.filter(note =>{return note.id!==id})

setNotes(notesArray)

localStorage.setItem('notes', JSON.stringify(notesArray))
}

  function pesquisar(event:ChangeEvent<HTMLInputElement>){

    const busca = event.target.value

    setPesquisa(busca)


  }

  const filtroDeNotas = pesquisa !=='' ? notes.filter(note =>note.content.toLocaleLowerCase().includes(pesquisa.toLocaleLowerCase())): notes

 return (
 
 <div className='mx-auto max-w-6xl space-y-8 px-5'>
    <img src={logo} style={{width:250, } } ></img>

<form className='w-full'>
    <input type="text" placeholder='Busque suas notas...' className='w-96 bg-transparent text-1xl font-semibold outline-none 'onChange={pesquisar}/>
</form>
  
  <div className=' h-px bg-zinc-900'></div>

  <div className='grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[250px] gap-6 '>
    
  {/* CARDS 1 - NOVA NOTA */}
  <NewNote notaCriada={notaCriada}/>
  
 
  {/* OUTROS CARDS */}
 
  {filtroDeNotas.map(note=>{return<NoteCard key={note.id} note={note} apagarNota={apagarNota}/>})}

  </div>

  
  </div>)
}


