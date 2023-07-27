import React from 'react'
import styled from 'styled-components'
import theme from '../../styles/theme'

const Title = styled.h1`
  font-family: Syncopate;
  font-size: 48px;
  font-size: 3rem;
  color: ${theme.colors.darkblue};
`

export default function Logo() {
  return <Title>Pass_nger</Title>
}
