import styled from 'styled-components'
import theme from '../../styles/theme'

export const BoxRegister = styled.div`
  background-color: ${theme.colors.background};
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 200px;

  form {
    width: 400px;
    display: flex;
    flex-direction: column;
    flex-wrap: 1;
    gap: 0.5rem;
  }
`

export const TextType = styled.p`
  font-size: 2rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: ${theme.colors.darkblue};
`
