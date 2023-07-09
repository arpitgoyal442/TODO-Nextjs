import Styles from "../styles/utils.module.css"
import {useState} from "react"
import Link from "next/link"
import { useRouter } from 'next/navigation'

export default function Login() {

  const [name,setName]=useState("")
  const router = useRouter()

  let handleButtonClick=()=>
  {
    if(name.length!=0)
    router.push({
      pathname: '/tasks/'+name,
      state: {name:name},
    });
    

    else alert("Atleast Write your name")
}

  return (
    <div className={Styles.container}>
    
    <h1>ToDo App</h1>
    <h2>What's Your Name</h2>
    <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}}  />

  
    <button onClick={handleButtonClick}>Go</button>
   
    
    </div>
  )
}
