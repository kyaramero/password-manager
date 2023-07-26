import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [auth, setAuth] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }))
  }
  const navigate = useNavigate()
  axios.defaults.withCredentials = true
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    axios
      .post('http://localhost:3001/login', formData)
      .then(res => {
        if (res.data.Status === 'Success') {
          navigate('/')
          setAuth(true)
        } else {
          alert(res.data.Error)
        }
      })
      .then(err => console.log(err))
  }

  return (
    <div className="container mt-5">
      <h1>Pass_nger</h1>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <p>You agree with terms of service</p>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
      <div className="mt-3">
        <p>Don't have an account? Register now:</p>
        <Link to="/register" className="btn btn-secondary">
          Register
        </Link>
      </div>
    </div>
  )
}

export default Login
