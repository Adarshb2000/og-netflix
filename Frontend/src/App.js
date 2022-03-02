import ReactDOM from 'react-dom'
import { StrictMode } from 'react'
import Home from './Home'
import LogIn from './LogIn'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Test from './Test'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </Router>
  )
}
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
)
