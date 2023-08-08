import { A, FooterContainer, Li, Ul } from './styles'

export default function Footer() {
  return (
    <FooterContainer>
      <Ul>
        <Li>
          <p>👋</p>
        </Li>
        <Li>
          <A href="https://github.com/gtomat98">Github</A>
        </Li>
        <Li>
          <A href="https://www.instagram.com/matheus_dafonseca/">Instagram</A>
        </Li>
        <Li>
          <A href="https://mail.google.com/mail/u/1/?ogbl#inbox?compose=GTvVlcSMVJHMdlxrzGgkMBBMdVKqpqZhjLvmwlGSvSGrjHhRLrQpvjgkgbGTbnZnsVdZcRPwGZwJH">
            Email
          </A>
        </Li>
      </Ul>
    </FooterContainer>
  )
}
