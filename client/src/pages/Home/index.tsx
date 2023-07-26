import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const [auth, setAuth] = useState(false)
  const [message, setMessage] = useState('')
  const [name, setName] = useState('')
  axios.defaults.withCredentials = true
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get('http://localhost:3001')
      .then(res => {
        if (res.data.Status === 'Success') {
          setAuth(true)
          setName(res.data.name)
        } else {
          setAuth(false)
          setMessage(res.data.Error)
        }
      })
      .then(err => console.log('err', err))
  }, [])

  const handleLogout = () => {
    axios
      .get('http://localhost:3001/logout')
      .then(res => {
        window.location.reload()
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="container mt-5">
      {auth ? (
        <div>
          <h1>Welcome, {name}!</h1>
          <button className="btn btn-primary" onClick={handleLogout}>
            Logout
          </button>
          <button
            className="btn btn-primary mt-3"
            onClick={() => navigate('/cardregister')}
          >
            Add card
          </button>
          <button
            className="btn btn-primary mt-3"
            onClick={() => navigate('/accountregister')}
          >
            Add account
          </button>
        </div>
      ) : (
        <div>
          <h1>{message}. Please log in to continue.</h1>
          <button
            className="btn btn-primary"
            onClick={() => navigate('/login')}
          >
            Log in
          </button>
        </div>
      )}
    </div>
  )
}

export default Home
