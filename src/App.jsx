import { useCallback, useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length,setLength]=useState(8)
  const [numberAllowed,setnumberAllowed]=useState(false)
  const [charAllowed ,setcharAllowed]=useState(false)
  const [password,setPassword]=useState('')

  const genPassword= useCallback(()=>{

    let pass=""
    let str= "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

    if(numberAllowed) str += "0123456789"
    if(charAllowed) str += "!@#$%^&*()"
    for(let i=1; i<length;i++){
      const char=Math.floor(Math.random()*str.length+1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  },[length,numberAllowed,charAllowed])

  useEffect(()=>{
    genPassword()
  },[length, numberAllowed, charAllowed])

  const copyPass=()=>{
    window.navigator.clipboard.writeText(password)
    passwordRef.current.select()
  }
  const passwordRef=useRef(null)

  return (
    <>
     <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 bg-gray-800 text-orange-500'>
      <h1 className="text-white text-center my-3">Random Password Genrator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
            <input type="text"
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='Password'
            readOnly
            ref={passwordRef}
            />
            <button 
            onClick={copyPass}
            className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type="range" 
          min={8}
          max={20}
          value={length}
          className='cursor-pointer'
          onChange={(e)=>setLength(e.target.value)}
          name=""
           id=""
           />
           <label htmlFor="length">Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox"
          defaultChecked={numberAllowed}
          onChange={()=>{
            setnumberAllowed((prev) =>!prev)
          }}
           name=""
          id=""
           />
           <label htmlFor="Number">number</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox"
          defaultChecked={charAllowed}
          onChange={()=>{
            setcharAllowed((prev) =>!prev)
          }}
           name=""
          id=""
           />
           <label htmlFor="charInput">Character</label>
        </div>
      </div>
     </div>
      
    </>
  )
}

export default App
