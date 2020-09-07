import AppLayout from "components/AppLayout"
import { useEffect, useState } from "react"
import Devit from "components/Devit"
import useRouter from 'hooks/useUser'
import {fetchDevit} from 'firebase/client'
export default function HomePage() {
  const [timeline, setTimeline] = useState([])
  const  user = useRouter();
  
  useEffect(() => {
   user && fetchDevit().then(res=>{
    console.log(res)
    setTimeline(res)
   })
      
  }, [user])

  return (
    <>
      <AppLayout>
        <header>
          <h2>inicio</h2>
        </header>
        <section>
          
          {timeline.map(({ id, username, avatar, message }) => (
            <Devit
              avatar={avatar}
              id={id}
              key={id}
              message={message}
              username={username}
            />
          ))}
        </section>
        <nav></nav>
      </AppLayout>
      <style jsx>{`
        header {
          align-items: center;
          border-bottom: 1px solid #ccc;
          height: 49px;
          display: flex;
          position: sticky;
          top: 0;
          width: 100%;
          background: #ffffff;
          opacity:0.93;
          filter: blur(0.7px);

        }

        h2 {
          font-size: 18px;
          font-weight: 800;
          padding-left:10px;
        }

        section {
          padding-top: 20px;

        }

        nav {
          bottom: 0;
          border-top: 1px solid #eee;
          height: 49px;
          position: sticky;
          width: 100%;
          background:#fff;
        }
      `}</style>
    </>
  )
}
