import React, { useState, ChangeEvent, FormEvent } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { BoxRegister, TextType } from '../../components/Registration'
import BtnSave from '../../components/BtnSave'
import TextInput from '../../components/TextInput'

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
    <BoxRegister>
      <TextType>Account Register</TextType>
      <form onSubmit={handleSubmit}>
        <TextInput
          formData={formData}
          handleChange={handleChange}
          label="Website name"
          type="text"
          id="brand"
        />
        <TextInput
          formData={formData}
          handleChange={handleChange}
          label="URL"
          type="url"
          id="url"
        />
        <TextInput
          formData={formData}
          handleChange={handleChange}
          label="Email"
          type="email"
          id="email"
        />
        <TextInput
          formData={formData}
          handleChange={handleChange}
          label="Password"
          type="password"
          id="password"
        />
        <BtnSave onClick={handleSubmit} buttonText="Save" />
      </form>
    </BoxRegister>
  )
}

export default AccountRegister
