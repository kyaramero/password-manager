import React, { useState, ChangeEvent, FormEvent } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { BoxRegister, TextType } from '../../components/Registration'
import TextInput from '../../components/TextInput'
import BtnSave from '../../components/BtnSave'

const CardRegister: React.FC = () => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    cvv: '',
    expirationDate: '',
    cardPassword: '',
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
      <TextType>Card Register</TextType>
      <form onSubmit={handleSubmit}>
        <TextInput
          formData={formData}
          handleChange={handleChange}
          label="Brand (eg. Mastercard)"
          type="text"
          id="brand"
        />
        <TextInput
          formData={formData}
          handleChange={handleChange}
          label="Card Number"
          type="text"
          id="cardNumber"
        />
        <TextInput
          formData={formData}
          handleChange={handleChange}
          label="Name (as in card)"
          type="text"
          id="cardName"
        />
        <TextInput
          formData={formData}
          handleChange={handleChange}
          label="CVV"
          type="password"
          id="cvv"
        />
        <TextInput
          formData={formData}
          handleChange={handleChange}
          label="Expiration Date"
          type="month"
          id="expirationDate"
        />
        <TextInput
          formData={formData}
          handleChange={handleChange}
          label="Card Password"
          type="password"
          id="cardPassword"
        />
        <BtnSave onClick={handleSubmit} buttonText="Save" />
      </form>
    </BoxRegister>
  )
}

export default CardRegister
