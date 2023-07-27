import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import TextInput from '../../components/TextInput'
import { Container, Title, Registration } from '../../components/Forms'
import BtnSubmit from '../../components/BtnSubmit'
import { toast } from 'react-toastify'

const Register: React.FC = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    axios.post('http://localhost:3001/register', formData).then(res => {
      if (res.data.Status == 'Success') {
        navigate('/login')
      }
      if (res.data.Error === 'Email already exists. Try another.') {
        toast.error(res.data.Error)
      }
    })
  }

  return (
    <Container>
      <Title>Registration</Title>
      <form onSubmit={handleSubmit}>
        <TextInput
          formData={formData}
          handleChange={handleChange}
          label="Name"
          type="name"
        />
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
        <BtnSubmit buttonText="Join now" onClick={handleSubmit} />
      </form>
      <Registration className="mt-3">
        <p>Already have an account? Log in now:</p>
        <Link to="/login" className="btn btn-secondary">
          Login
        </Link>
      </Registration>
    </Container>
  )
}

export default Register
