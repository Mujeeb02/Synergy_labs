import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UsersList from './components/UsersList'

const App = () => {
  return (
    <Router>
      <div className="container mx-auto bg-[#F9FAFB]">
        <Routes>
          <Route path="/" element={<UsersList />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
