import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {io} from 'socket.io-client'

function App() {

  const [message, setMessage ] = useState('')
  
  const socket = io("http://localhost:4000")

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", message)
    setMessage('');
  }

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected", socket.id)
    })

    socket.on("welcome", (data) => {
      console.log(data)
    })
    // socket.on("welcome-join", (data) => {
    //   console.log(data)
    // })
  }, [])

  return (
    <>
      <h1 className='text-3xl'>Socket.io messaging</h1>
      <form className='flex flex-col gap-5 ml-10 mt-16' onSubmit={handleSubmit}  >
        <div>
          <label>Message: </label>
          <input type="text"
          placeholder='message here'
          className='p-3 ml-2 bg-gray-200 text-black font-semibold'
          name='message'
          value={message}
          onChange={(e) => setMessage(e.target.value)} />
        </div>

        <div>
          <button type='submit'
          className='p-4 bg-blue-400 rounded-md font-bold ' >
            Send
          </button>
        </div>
      </form>
    </>
  )
}

export default App
