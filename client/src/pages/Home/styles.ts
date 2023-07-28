import styled from 'styled-components'
import theme from '../../styles/theme'

export const Container = styled.div`
  background-color: ${theme.colors.background};
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`

export const Title = styled.div`
  font-family: ${theme.fonts.secondary.regular};
  color: ${theme.colors.blue};
  font-size: 4rem;
  padding: 1rem 4rem;
`

export const PasswordBox = styled.div`
  padding: 2rem;
  border-radius: 8px;
  margin: 2rem auto;
  height: 500px;
  overflow-y: auto;
`
