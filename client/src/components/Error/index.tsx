import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import theme from '../../styles/theme'

const Container = styled.div`
  background-color: ${theme.colors.background};
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

interface ErrorMessageProps {
  message: string
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  const navigate = useNavigate()

  return (
    <Container>
      <h1>{message}. Please log in to continue.</h1>
      <button className="btn btn-primary" onClick={() => navigate('/login')}>
        Log in
      </button>
    </Container>
  )
}

export default ErrorMessage
