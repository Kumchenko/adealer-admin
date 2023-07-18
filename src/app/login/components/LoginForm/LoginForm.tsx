'use client'
import Button from '@/components/Button/Button'
import { Form, FormInput } from '@/components/Form'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const LoginForm = () => {
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
        onSubmit: values => console.log(values),
    })

    return (
        <Form formik={formik} className="flex flex-col gap-4">
            <h5 className="text-center text-h5 font-semibold">
                Employee Auth Data
            </h5>
            <FormInput
                label="Username"
                name="login"
                id="login"
                placeholder="Username"
            />
            <FormInput
                label="Password"
                name="password"
                id="password"
                type="password"
                placeholder="Password"
            />
            <Button
                className="mx-auto bg-green text-green-white hover:bg-green-light active:bg-green-dark"
                type="submit"
            >
                Log In
            </Button>
        </Form>
    )
}

export default LoginForm
