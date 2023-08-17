import Button from '@/components/Button/Button'
import { FormInput } from '@/components/Form'
import { DesignColor } from '@/constants'
import { CallData } from '@/interfaces'
import { useUpdateCallMutation, useDeleteCallMutation } from '@/services/calls'
import { showModal } from '@/services/modal'
import { useAppDispatch } from '@/store'
import { FormikProvider, useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import * as Yup from 'yup'

const CallForm = ({ call }: { call: CallData }) => {
    const dispatch = useAppDispatch()
    const router = useRouter()

    const [updateCall, { isLoading: isUpdating }] = useUpdateCallMutation()
    const [deleteCall, { isLoading: isDeleting }] = useDeleteCallMutation()

    const initialValues: CallData = call

    const validationSchema = Yup.object({
        name: Yup.string()
            .min(3, ({ min }) => `Min ${min} letters`)
            .max(32, ({ max }) => `Max ${max} letters`)
            .required('Required'),
        surname: Yup.string()
            .min(3, ({ min }) => `Min ${min} letters`)
            .max(32, ({ max }) => `Max ${max} letters`)
            .required('Required'),
        tel: Yup.string()
            .matches(/^[+]{1}38[0]{1}[0-9]{9}$/, 'Incorrect format')
            .required('Required'),
        created: Yup.date().max(new Date(), 'Future date').required('Required'),
        checked: Yup.date().max(new Date(), 'Future date').nullable(),
    })

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: () => {},
    })

    return (
        <FormikProvider value={formik}>
            <FormInput className="col-span-3" id="name" label="Name" name="name" type="text" />
            <FormInput className="col-span-3" id="tel" label="Phone number" name="tel" type="text" />
            <FormInput className="col-span-3" id="created" label="Created" name="created" type="datetime-local" />
            <FormInput className="col-span-3 mb-2" id="checked" label="Checked" name="checked" type="datetime-local" />
            <Button onClick={() => router.push('/calls')} color={DesignColor.Violet}>
                Close
            </Button>
            <Button
                onClick={() =>
                    deleteCall(formik.values.id)
                        .unwrap()
                        .then(() => router.push('/calls'))
                }
                color={DesignColor.Red}
                isLoading={isDeleting}
            >
                Delete
            </Button>
            <Button
                onClick={() =>
                    updateCall(formik.values)
                        .unwrap()
                        .then(() =>
                            dispatch(showModal({ title: 'Success', description: 'Call info successfully updated' })),
                        )
                }
                disabled={formik.values == formik.initialValues}
                color={DesignColor.Green}
                isLoading={isUpdating}
            >
                Save
            </Button>
        </FormikProvider>
    )
}

export default CallForm
