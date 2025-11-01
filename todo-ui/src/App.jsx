import './App.css'
import Todo from './components/Todo'

function App() {
  return (
    <>
      <Todo/>
    </>
  )
}

export default App

{/** db["tasks"].deleteMany({$and:[{name:{$exists:false}},{descrption:{$exists:false}}]}) */}