import * as Dialog from '@radix-ui/react-dialog'

import{formatDistanceToNow} from 'date-fns'
import{ptBR} from 'date-fns/locale'

import{X}from 'lucide-react'

interface NoteCardProps{
  note:{date:Date
    id:string
  content:string}

  apagarNota: (id:string)=> void
}

export function NoteCard({note,apagarNota}: NoteCardProps){
    return(
      
    <Dialog.Root>
    <Dialog.Trigger className='rounded-lg bg-zinc-900 p-5 space-y-1 overflow-hidden relative   hover:ring-2 hover:ring-blue-600 text-left focus-visible:ring-2 focus-visible:ring-blue-600 outline-none flex flex-col'>
      <span className='text-sm font-medium text-slate-400 text'>{formatDistanceToNow(note.date,{locale:ptBR,addSuffix:true})}</span>
  
      <p className='text-sm leading-6 text-slate-400 items-start'>{note.content}</p>
  
  
      <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/70 to black/0  pointer-events-none'></div>
    </Dialog.Trigger>

    <Dialog.Portal>
    
        <Dialog.Overlay className='inset-0 fixed bg-zinc-950/70'/>

      {/* MODAL */}
       <Dialog.Content className='fixed inset-0 md:inset-auto overflow-hidden md:left-1/2 md:top-1/2 md:-translate-x-1/2  md:-translate-y-1/2 md:max-w-[650px] w-full md:h-[60vh] bg-zinc-950 rounded-lg flex flex-col outline-none ring-2 ring-blue-950 p-10 text-lg'>

        <Dialog.Close className='absolute right-0 top-0 p-4 text-blue-600 hover:text-red-600'> <X className='size-5'/> </Dialog.Close>

        <div className=' flex flex-1 flex-col gap-3 p-5'>

            <span className='text-sm font-medium text-slate-400'>{formatDistanceToNow(note.date,{locale:ptBR,addSuffix:true})}</span>
  
            <p className='text-sm leading-6 text-slate-400'>{note.content}p</p>

        </div>


        <button type="button" className='w-52 bg-zinc-800 ring-2 ring-slate-600 hover:ring hover:ring-blue-600 py-3 text-center text-sm text-slate-300 outline-none mx-auto rounded-lg font-medium group' onClick={()=>apagarNota(note.id)}>
          
          <span className=' font-medium group-hover:underline hover:text-red-600'>Apagar</span> nota?
          
        </button>

       </Dialog.Content>
      {/* MODAL */}


    </Dialog.Portal>
    </Dialog.Root>
  )
}