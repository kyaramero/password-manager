import styled from 'styled-components'
import theme from '../../styles/theme'

export const Container = styled.div`
  background-color: ${theme.colors.background};
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  form {
    width: 400px;
    display: flex;
    flex-direction: column;
    flex-wrap: 1;
  }
`

export const Title = styled.h1`
  color: ${theme.colors.blue};
  font-size: 2rem;
`

export const Registration = styled.div`
  display: flex;
  flex-direction: column;
`
