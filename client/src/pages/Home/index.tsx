import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Container, PasswordBox, Title } from './styles'
import ErrorMessage from '../../components/Error'
import PasswordTable from '../../components/PasswordTable'

const Home = () => {
  const [auth, setAuth] = useState(false)
  const [message, setMessage] = useState('')
  const [name, setName] = useState('')
  axios.defaults.withCredentials = true
  const navigate = useNavigate()
  const [passwords, setPasswords] = useState([])

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

  useEffect(() => {
    axios
      .get('http://localhost:3001/passwords')
      .then(res => {
        setPasswords(res.data)
      })
      .catch(err => console.log(err))
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
    <Container>
      {auth ? (
        <div>
          <Title>Welcome, {name}!</Title>
          <div className="d-grid gap-2 d-md-flex justify-content-md-center">
            <button
              className="btn btn-secondary"
              onClick={() => navigate('/cardregister')}
            >
              Add card
            </button>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => navigate('/accountregister')}
            >
              Add account
            </button>
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>
          <PasswordBox>
            <PasswordTable data={passwords} />
          </PasswordBox>
        </div>
      ) : (
        <ErrorMessage message={message} />
      )}
    </Container>
  )
}

export default Home
