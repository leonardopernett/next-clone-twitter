import {useState, useEffect} from 'react'

import AppLayout from 'components/AppLayout'
import Button from 'components/Button'
import useUser from 'hooks/useUser'
import {addDevit, uploadImage} from 'firebase/client'
import {useRouter} from 'next/router'

const COMPOSE_STATE ={
  LOADING:1,
  SUCCESS_:2,
  ERROR:-1
}


const DRAG_IMAGE_STATE ={
  error:-1,
  NONE:0,
  DRAF_OVER:1,
  UPLOADING:2,
  complete:3
}

export default function Tweek(){
 
  const [status, setStatus]= useState(COMPOSE_STATE)
  const [message, setmessage] = useState('')
  const [drag, setDrag] = useState(DRAG_IMAGE_STATE.NONE)
  const [task, setTask] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)

  
  useEffect(()=>{

   const onProgress = ()=>{}
   const onError = ()=>{}
   const onComplete = ()=>{
     console.log('complete')
   }

     if(task){
       //metodo de firebase
        task.on('state_changed',
          onProgress,
          onError,
          onComplete
        )
     }
  },[task])


  const user = useUser();
  const router = useRouter()

  const handleSubmit = (e)=>{
    e.preventDefault();
    setStatus(COMPOSE_STATE.LOADING)
    addDevit({
      avatar : user.avatar,
      message:message,
      uid:user.uid,
      username: user.username
    }).then(()=>{
      router.push('/home')
    })
    
  }

  const handleDragEnter = e=>{
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATE.DRAF_OVER)
  }
  const handlerDragLeave = e=>{
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATE.NONE)
  }
  const handlerDrop  = e=>{
    e.preventDefault()
    console.log(e.dataTransfer.files[0])
    const  file = e.dataTransfer.files[0];
    const res = uploadImage(file)
    setTask(res)
}
 const isButtonDisabled = !message.length || status === COMPOSE_STATE.LOADING
   return(
   	<>
   	<AppLayout>
       <form action="" onSubmit={handleSubmit}>
       <textarea 
          onDragEnter={handleDragEnter}
          onDragLeave={handlerDragLeave}
          onDrop={handlerDrop}
          placeholder="¿Que esta pènsando ?"
          value={message}
          onChange={e=>setmessage(e.target.value)}
         >
        </textarea>
        <Button disabled={isButtonDisabled} >
           Devitear
        </Button>
       </form>
   	</AppLayout>
   	 <style jsx>{`
          textarea{
            width:100%;
            resize:none;
            padding:15px;
            border:${drag === DRAG_IMAGE_STATE.DRAF_OVER ? '3px dashed #09f': '3px solid transparent'};
            outline:0;
            min-height:200px;
            font-size:14px;
            
          }

   	 	`}</style>
   </>
   	)
}