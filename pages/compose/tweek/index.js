import {useState} from 'react'

import AppLayout from 'components/AppLayout'
import Button from 'components/Button'
import useUser from 'hooks/useUser'
import {addDevit} from 'firebase/client'
import {useRouter} from 'next/router'


const COMPOSE_STATE ={
  LOADING:1,
  SUCCESS_:2,
  ERROR:-1
}


export default function Tweek(){
  const user = useUser();
  const router = useRouter()
  const [status, setStatus]= useState(COMPOSE_STATE)
  const [message, setmessage] = useState('')
 
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
 const isButtonDisabled = !message.length || status === COMPOSE_STATE.LOADING
   return(
   	<>
   	<AppLayout>
       <form action="" onSubmit={handleSubmit}>
       <textarea 
          placeholder="¿Que esta pasando ?"
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
            border:0;
            outline:0;
            min-height:200px;
            font-size:14px;
            
          }

   	 	`}</style>
   </>
   	)
}