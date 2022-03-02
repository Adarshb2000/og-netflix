import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { host } from './config'
import { logout } from './Helper'

const Home = () => {
  const navigate = useNavigate()
  const [animal, setAnimal] = useState()
  const [tag, setTag] = useState('')
  const [loading, setLoading] = useState(true)

  const formSubmit = async (e) => {
    //search for a record
    e.preventDefault()
    if (animal && tag) {
      navigate(`/${animal}/${tag}`, { replace: true })
    } else if (!animal) {
      alert('invalid animal')
    } else {
      alert('invalid tag number')
    }
  }

  const verifyToken = async () => {
    try {
      const ret = await fetch(host, {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token'),
        },
      })
      if (!ret.ok) navigate('/login')
      else setLoading(false)
    } catch (e) {
      alert('Not connected to internet')
    }
  }

  useEffect(() => {
    verifyToken()
  }, [])

  return loading ? (
    <>Loading...</>
  ) : (
    <div className="wrapper extra-short">
      <form className="home-container" onSubmit={formSubmit}>
        <h4 className="heading1"> SEARCH RECORD </h4>
        <div className="responsive-box min-h-[80px]">
          <label htmlFor="animal">
            Animal:
            <select
              className="inputs"
              id="animal"
              name="Animal"
              onChange={(e) => setAnimal(e.target.value)}
              defaultValue=""
            >
              <option value="" disabled>
                Select
              </option>
              <option value="cow">Cow</option>
              <option value="buffalo">Buffalo</option>
            </select>
          </label>
          <label htmlFor="tag">
            Tag No.:
            <input
              className="inputs w-20"
              onChange={(e) => setTag(e.target.value)}
              id="tag"
              name="Tag"
              value={tag}
              type="number"
              min={1}
            />
          </label>
        </div>
        <button className="buttons" type="submit">
          search
        </button>
        <div className="border-t-2 border-grey1 w-full h-0"></div>
        <div className="responsive-box min-h-[70px]">
          <button className="buttons2 h-fit w-fit">
            <Link to={'/new-record'}>add new record</Link>
          </button>
          <button
            className="buttons2 h-fit w-fit"
            onClick={() => {
              logout(navigate)
            }}
          >
            logout
          </button>
        </div>
      </form>
    </div>
  )
}

export default Home
