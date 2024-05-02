'use client'
import Api from '@/api'
import Button from '@/components/Button/Button'
import { Form, FormInput } from '@/components/Form'
import { DesignColor, ModalType } from '@/constants'
import { showModal } from '@/services/modal'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import * as Yup from 'yup'

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

const LoginForm = () => {
  const router = useRouter()
  const initialValues = {
    login: '',
    password: '',
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async values => {
      await Api.Employee.login(values)
      router.push('/dashboard')
      showModal({ title: 'Wrong credentials', type: ModalType.Error, milliSeconds: 10000 })
    },
  })

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
