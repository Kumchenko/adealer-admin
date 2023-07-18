import Card from '@/components/Card/Card'
import Section from '@/components/Section/Section'
import LoginForm from '../LoginForm/LoginForm'

const LoginSection = () => {
    return (
        <Section>
            <h1 className="text-center text-h1 font-medium">
                AppleDealer Managing System
            </h1>
            <p className="mt-4 text-center text-2xl">Authorized access only!</p>
            <Card className="mx-auto mt-12 w-80 px-4 py-2">
                <LoginForm />
            </Card>
        </Section>
    )
}

export default LoginSection
