import Card from '@/components/Card/Card'
import Section from '@/components/Section/Section'
import LoginForm from '../LoginForm/LoginForm'

const LoginSection = () => {
  return (
    <Section full={true}>
      <h1 className="text-center text-h2 font-medium sm:text-h1">AppleDealer Managing System</h1>
      <p className="mt-4 text-center text-xl sm:text-2xl">Authorized access only!</p>
      <Card className="mx-auto mt-8 w-5/6 sm:mt-12 sm:w-80">
        <LoginForm />
      </Card>
    </Section>
  )
}

export default LoginSection
