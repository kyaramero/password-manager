import React, { useState, ChangeEvent, FormEvent } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AccountRegister: React.FC = () => {
  const [formData, setFormData] = useState({
    url: '',
    email: '',
    password: '',
    brand: '',
  })

  const navigate = useNavigate()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    axios
      .post('http://localhost:3001/passwords', formData)
      .then(res => {
        if (res.data.Status == 'Success') {
          navigate('/')
        }
      })
      .then(err => console.log(err))
  }

  return (
    <div className="container mt-5">
      <h2>Account Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Website name:</label>
          <input
            type="text"
            className="form-control"
            id="brand"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>URL:</label>
          <input
            type="text"
            className="form-control"
            id="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
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

        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  )
}

export default AccountRegister
