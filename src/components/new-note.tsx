import * as Dialog from '@radix-ui/react-dialog'

import{X} from 'lucide-react'
import { ChangeEvent, FormEvent, useState } from 'react'

import{toast} from 'sonner'


interface NewNoteProps {notaCriada:(content:string)=>void}

let SpeechRecognition:SpeechRecognition | null = null


export function NewNote({notaCriada}:NewNoteProps){

  const [aparecerOuNao,setSimOuNao] = useState(true)

  const [content,setContent]=useState('')


  const [taGravando,setTaGravando] = useState(false)

  function escrevernota(){setSimOuNao(false)}


  function voltarOpcoes(event:ChangeEvent<HTMLTextAreaElement>){

    setContent(event.target.value)

if(event.target.value ===""){setSimOuNao(true)}

  }

  function salvarNota(event:FormEvent){event.preventDefault()


    if(content ===''){return alert ("Crie uma nota")}

    notaCriada(content)

    setContent('')
    
    setSimOuNao(true)
  
      toast.success("Nota criada com sucesso")
  
  }


  function gravar(){

    

    const gravadorFunciona = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window

    if(!gravadorFunciona){alert("Seu navegador não suporta a gravação de audio!!")
  return}

  setTaGravando(true)
  setSimOuNao(false)


  const SpeechRecognitionApi = window.SpeechRecognition || window.webkitSpeechRecognition

   SpeechRecognition = new SpeechRecognitionApi()

  SpeechRecognition.lang='pt-BR'
  SpeechRecognition.continuous= true
  SpeechRecognition.maxAlternatives = 1
  SpeechRecognition.interimResults = true

  SpeechRecognition.onresult=(event)=>{ 
    const transcricao = Array.from(event.results).reduce((text,result)=>{ return text.concat(result[0].transcript)},'')
  
    setContent(transcricao)
  
  }

  SpeechRecognition.onerror =(event)=>{console.error(event)}

  SpeechRecognition.start()
  
  }


  function paraGravacao(){
    setTaGravando(false)


    if(SpeechRecognition !== null){SpeechRecognition.stop()}
    
  }

return(
  
  
  <Dialog.Root>
    
<Dialog.Trigger className='rounded-lg bg-zinc-900 p-5 flex flex-col gap-3 overflow-hidden relative ring-2 ring-zinc-600 hover:ring-2 hover:ring-blue-800 focus-visible:ring-2 focus-visible:ring-blue-600 outline-none text-left'>


    <span className='text-sm font-medium text-slate-100 '>Adicionar nota</span>

    <p className='text-sm leading-6 text-slate-400'>Grave uma nota em audio que será convertida em texto automaticamente!</p>

</Dialog.Trigger>



<Dialog.Portal>
    
<Dialog.Overlay className='inset-0 fixed bg-zinc-950/70'/>

  {/* MODAL */}
   <Dialog.Content className='inset-0 md:inset-auto overflow-hidden fixed md:left-1/2 md:top-1/2 md:-translate-x-1/2  md:-translate-y-1/2 md:max-w-[650px] w-full md:h-[60vh] bg-zinc-950 rounded-lg flex flex-col outline-none ring-2 ring-blue-950 p-10 text-lg'>

    <Dialog.Close className='absolute right-0 top-0 p-4 text-blue-600 hover:text-red-600'> <X className='size-5'/> </Dialog.Close>


      <form  className='flex-1 flex flex-col'>
    <div className=' flex flex-1 flex-col gap-3 p5'>

        <span className='text-sm font-medium text-slate-400'>Adicionar nova nota</span>

        {aparecerOuNao ? (<p className='text-sm leading-6 text-slate-400'>Comece <button type='button' onClick={gravar}  className='font-medium text-blue-600 hover:underline'>gravando</button>  uma nota em áudio ou em texto <button type='button' className='font-medium text-blue-600 hover:underline' onClick={escrevernota} >texto</button> </p>): (<textarea autoFocus className='text-sm leading-6 text-slate-200 bg-transparent resize-none flex-1 outline-none' onChange={voltarOpcoes} value={content}></textarea>)}

    </div>

    {taGravando?(<button type="button" onClick={paraGravacao}  className='w-52 bg-blue-900 ring-2 ring-slate-600 hover:ring hover:ring-red-600 py-3 text-center text-sm text-slate-300 outline-none mx-auto rounded-lg font-medium ' >
      Gravando! (clique para interromper) </button>)
      
      :( <button type="button" onClick={salvarNota} className='w-52 bg-zinc-800 ring-2 ring-slate-600 hover:ring hover:ring-blue-600 py-3 text-center text-sm text-slate-300 outline-none mx-auto rounded-lg font-medium ' >

      Salvar nota
   </button>)}

   

   </form>
  </Dialog.Content>
  {/* MODAL */}


</Dialog.Portal>




  </Dialog.Root>
  )
}