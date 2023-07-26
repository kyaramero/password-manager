import React, { useState, ChangeEvent, FormEvent } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {}

  return (
    <div className="container mt-5">
      <h2>Card Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="expirationDate">Brand:</label>
          <input
            type="text"
            className="form-control"
            id="expirationDate"
            name="expirationDate"
            value={formData.brand}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cardNumber">Card Number:</label>
          <input
            type="text"
            className="form-control"
            id="cardNumber"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cardHolderName">Name:</label>
          <input
            type="text"
            className="form-control"
            id="cardHolderName"
            name="cardHolderName"
            value={formData.cardName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cvv">CVV:</label>
          <input
            type="text"
            className="form-control"
            id="cvv"
            name="cvv"
            value={formData.cvv}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="expirationDate">Expiration Date: eg.12/2032</label>
          <input
            type="text"
            className="form-control"
            id="expirationDate"
            name="expirationDate"
            value={formData.expirationDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cardPassword">Card Password:</label>
          <input
            type="password"
            className="form-control"
            id="cardPassword"
            name="cardPassword"
            value={formData.cardPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Register Card
        </button>
      </form>
    </div>
  )
}

export default CardRegister