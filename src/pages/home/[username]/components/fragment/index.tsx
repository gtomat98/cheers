import { ReactNode } from 'react'
import {
  FragmentBackground,
  FragmentContainer,
  FragmentContent,
} from './styles'

// need to config
interface FragmentProps {
  children?: ReactNode
}

export default function Fragment({ children }: FragmentProps) {
  return (
    <FragmentContainer>
      <FragmentBackground />
      <FragmentContent>{children}</FragmentContent>
    </FragmentContainer>
  )
}
