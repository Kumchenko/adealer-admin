'use client'
import Button from '@/components/Button/Button'
import { Form, FormInput } from '@/components/Form'
import { DesignColor } from '@/interfaces'
import { useLoginEmployeeMutation } from '@/services/employee'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import * as Yup from 'yup'

const LoginForm = () => {
    const [loginEmployee] = useLoginEmployeeMutation()
    const router = useRouter()
    const initialValues = {
        login: '',
        password: '',
    }
    const validationSchema = Yup.object({
        login: Yup.string().min(2, 'Min 2 letters').required('Required'),
        password: Yup.string().required('Required'),
    })
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: values => {
            loginEmployee(values).then(() => router.push('/dashboard'))
        },
    })

    return (
        <Form formik={formik} className="flex flex-col gap-4">
            <FormInput label="Username" name="login" type="text" placeholder="Username" />
            <FormInput label="Password" name="password" type="password" placeholder="Password" />
            <Button className="mx-auto" color={DesignColor.Green} onClick={() => formik.submitForm()}>
                Log In
            </Button>
        </Form>
    )
}

export default LoginForm
