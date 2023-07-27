import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    fonts: {
      primary: {
        regular: string
      }
      secondary: {
        regular: string
      }
    }
    colors: {
      darkblue: string
      background: string
    }
  }
}
