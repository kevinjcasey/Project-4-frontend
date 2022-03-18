import { Routes, Route } from 'react-router-dom'
import { Home } from './components/Home'
import { Add } from './components/Add'
import { Edit } from './components/Edit'

function App(props) {

  return (
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='add' element={<Add />}/>
      <Route path='edit' element={<Edit />}/>
    </Routes>
  )
}

export default App;