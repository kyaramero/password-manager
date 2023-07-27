import axios from 'axios'
import BtnSubmit from '../../components/BtnSubmit'
import { Container, Title, Registration } from '../../components/Forms'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../../components/Logo'
import React, { useState } from 'react'
import TextInput from '../../components/TextInput'
import { toast } from 'react-toastify'

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

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
        } else {
          toast.error(`${res.data.Error}`)
        }
      })
      .then(err => console.log(err))
  }

  return (
    <Container>
      <Logo />
      <Title>Log in</Title>
      <form onSubmit={handleSubmit}>
        <TextInput
          formData={formData}
          handleChange={handleChange}
          label="Email"
          type="email"
        />
        <TextInput
          formData={formData}
          handleChange={handleChange}
          label="Password"
          type="password"
        />
        <p>You agree with terms of service</p>
        <BtnSubmit buttonText="Login" onClick={handleSubmit} />
      </form>
      <Registration className="mt-3">
        <p>Don't have an account? Register now:</p>
        <Link to="/register" className="btn btn-secondary">
          Register
        </Link>
      </Registration>
    </Container>
  )
}

export default Login
