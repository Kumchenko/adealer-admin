import { FormikProvider } from 'formik'
import { FormProps } from './interfaces'

const Form = ({ children, className, formik }: FormProps) => {
    return (
        <FormikProvider value={formik}>
            <div className={className}>{children}</div>
        </FormikProvider>
    )
}

export { Form }
