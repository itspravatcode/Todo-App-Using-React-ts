import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TodoApp from './Components/TodoApp.tsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <TodoApp/>
    </>
  )
}

export default App
