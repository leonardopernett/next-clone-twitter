import AppLayout from "components/AppLayout"
import { useEffect, useState } from "react"
import Devit from "components/Devit"
import useUser from 'hooks/useUser'
import {fetchDevit} from 'firebase/client'

import Link from 'next/link'
import Head from 'next/head'

import Create from 'components/Icons/Create'
import Home from 'components/Icons/Home'
import Search from 'components/Icons/Search'

export default function HomePage() {
  const [timeline, setTimeline] = useState([])
  const  user = useUser();
  
  useEffect(() => {
   user && fetchDevit().then(setTimeline)
    
  }, [user])

  return (
    <>
      <AppLayout>
        <Head>
            <title>Inicio | devter</title>
        </Head>
        <header>
          <h2>inicio</h2>
        </header>
        <section>
          
          {timeline.map(({ id, username, avatar, message,createdAt }) => (
            <Devit
              avatar={avatar}
              id={id}
              key={id}
              message={message}
              username={username}
              createdAt={createdAt}
            />
          ))}

        </section>
        <nav>
           <Link href="/home">
              <a>
                <Home width={32} stroke="#09f" />
              </a>
           </Link>
           <Link href="/compose/tweek">
              <a>
                <Search width={32} stroke="#09f" />
              </a>
           </Link>

           <Link href="/compose/tweek">
              <a>
                <Create width={32} stroke="#09f" />
              </a>
           </Link>
        </nav>
      </AppLayout>
      <style jsx>{`
        header {
          align-items: center;
          border-bottom: 1px solid #333;
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
          flex:1;

        }

        nav {
          bottom: 0;
          border-top: 1px solid #eee;
          height: 49px;
          position: sticky;
          width: 100%;
          background:#fff;
          display:flex;
          
        }
        nav a {
          justify-content:center;
          align-items:center;
          flex:1 1 auto;
          display:flex;
        }

        nav a:hover{
          background:radial-gradient(red 15% transparent 16&);
          background-size:180px 180px;
          background-position:center;
        }
      `}</style>
    </>
  )
}
