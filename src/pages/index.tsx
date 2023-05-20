import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { useState } from 'react'

// type User = { 
//   login: string
//   id: number,
//   node_id: string
//   avatar_url: string
//   gravatar_id: string
//   url: string
//   html_url: string
//   followers_url: string
//   following_url: string
//   gists_url: string
//   starred_url: string
//   subscriptions_url: string
//   organizations_url: string
//   repos_url: string
//   events_url: string
//   received_events_url: string
//   type: string
//   site_admin: boolean
//   name: string
//   company: string|null
//   blog: string
//   location: string|null
//   email: string|null
//   hireable: string|null
//   bio: string|null
//   twitter_username: string|null
//   public_repos: number
//   public_gists: number
//   followers: number
//   following: number
//   created_at: string
//   updated_at: string
// }

type User = {   
  id: number,  
  avatar_url: string
  html_url: string
  name: string
}

type Repos = {
  id : number
  name : string
  html_url : string
}

export default function Home() {
  const [data, setData ] = useState('')
  const [user, setUser ] = useState<User>()
  const [repos, setRepos ] = useState<Repos[]>()

  const handleInputEvent = async () => {
    if(data != ""){
      const user = await fetch(`https://api.github.com/users/${data}`)
      const jsonuser = await user.json()
      if(!jsonuser.message){        
        const res = await fetch(`https://api.github.com/users/${data}/repos`)    
        const jsonrepos = await res.json()
        setUser(jsonuser)
        setRepos(jsonrepos)
      }
    }
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />        
      </Head>
      <main className={styles.main}>
        <div className={styles.center}>
            <input 
              type='text' 
              placeholder='Informe o Username' 
              value={data}
              onChange={e => setData(e.target.value)}
            />
            <button onClick={handleInputEvent}>Buscar</button>
        </div>
        { user && 
          <div className={styles.content}>
            <p>Nome : {user.name} </p>
            <p>Id : {user.id}</p>
            <p><a href={user.html_url} target='blank'>Ver pefil</a></p>
          </div>
        }
        { repos &&
          <div className={styles.content}>
            <ul>
              {
                repos.map((item, index) => (
                  <li key={index}>
                    <p>{item.name} - <a href={item.html_url}>Ver mais</a></p>
                  </li>
                ))
              }
            </ul>
          </div>
        }
      </main>
    </>
  )
}
