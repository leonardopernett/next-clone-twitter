import Avatar from "components/Avatar"
import useTimeago from 'hooks/useTimeago'

export default function Devit({ avatar, username, message, id,createdAt }) {
  const timeago = useTimeago(createdAt);
  return (
    <>
      <article>
        <div>
          <Avatar alt={username} src={avatar} />
        </div>
        <section>
          <strong>{username}</strong> <small>{timeago}</small>
          <p>{message}</p>
         
        </section>
      </article>
      <style jsx>{`
        article {
          border-bottom: 2px solid #eaf7ff;
          display: flex;
          padding: 10px 15px;
        }

        div {
          padding-right: 10px;
        }

        p {
          line-height: 1.3125;
          margin: 0;
        }
        smDall{
          color:#555;
          font-size:10px
        }
      `}</style>
    </>
  )
}
