'use client'
import Button from '@/components/Button/Button'
import { Form, FormInput } from '@/components/Form'
import { DesignColor, failedCrossSiteModalParams } from '@/constants'
import { useLoginEmployeeMutation } from '@/services/employee'
import { showModal } from '@/services/modal'
import { useAppDispatch } from '@/store'
import { axiosInstance } from '@/utils/axios'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import * as Yup from 'yup'

const LoginForm = () => {
    const [loginEmployee] = useLoginEmployeeMutation()
    const dispatch = useAppDispatch()
    const router = useRouter()
    const initialValues = {
        login: '',
        password: '',
    }
    const validationSchema = Yup.object({
        login: Yup.string()
            .min(3, ({ min }) => `Min ${min} letters`)
            .max(20, ({ max }) => `Max ${max} letters`)
            .required('Required'),
        password: Yup.string()
            .min(5, ({ min }) => `Min ${min} letters`)
            .max(64, ({ max }) => `Max ${max} letters`)
            .required('Required'),
    })
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: values => {
            loginEmployee(values)
                .unwrap()
                .then(() => router.push('/dashboard'))
        },
    })

    useEffect(() => {
        const checkCrossSite = async () => {
            try {
                await axiosInstance('/employee/connect')
                await axiosInstance('/employee/test')
            } catch {
                dispatch(showModal(...failedCrossSiteModalParams))
            }
        }

        checkCrossSite()
    }, [])

    return (
        <Form formik={formik} className="flex flex-col gap-4">
            <FormInput label="Username" id="login" name="login" type="text" placeholder="Username" />
            <FormInput label="Password" id="password" name="password" type="password" placeholder="Password" />
            <Button className="mx-auto" color={DesignColor.Green} onClick={() => formik.submitForm()}>
                Log In
            </Button>
        </Form>
    )
}

export default LoginForm
