import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authentication } from './Helper'

const LogIn = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const formSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const data = await authentication(username, password)
      localStorage.setItem('token', data.token)
      navigate('/', { replace: true })
    } catch (err) {
      setLoading(false)
      alert(err)
      setUsername('')
      setPassword('')
    }
  }
  return loading ? (
    <>Loading</>
  ) : (
    <div className="wrapper extra-short">
      <form className="login-container" onSubmit={formSubmit}>
        <div className="heading0">LOGIN</div>
        <div>
          <label htmlFor="Username">
            <span className="font-semibold">Username:</span>
            <input
              className="inputs min-w-[100px] max-w-[250px] w-3/5"
              onChange={({ target }) => setUsername(target.value.toLowerCase())}
              value={username}
              autoCapitalize="none"
              placeholder="username"
              autoFocus={true}
            />
          </label>
        </div>
        <div>
          <label htmlFor="Password">
            <span className="font-semibold">Password:</span>
            <input
              className="inputs min-w-[100px] max-w-[250px] w-3/5"
              id="password"
              type="password"
              onChange={({ target }) => setPassword(target.value)}
              value={password}
              placeholder="password"
            />
          </label>
        </div>
        <div>
          <button className="buttons">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default LogIn
