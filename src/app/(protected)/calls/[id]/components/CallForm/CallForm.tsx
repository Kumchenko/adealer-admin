import Button from '@/components/Button/Button'
import { FormInput } from '@/components/Form'
import { CallData, DesignColor } from '@/interfaces'
import { useUpdateCallMutation, useDeleteCallMutation } from '@/services/calls'
import { FormikProvider, useFormik } from 'formik'
import { useRouter } from 'next/navigation'

const CallForm = ({ call }: { call: CallData }) => {
    const router = useRouter()

    const [updateCall] = useUpdateCallMutation()
    const [deleteCall] = useDeleteCallMutation()

    const initialValues: CallData = call

    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        onSubmit: () => {},
    })

    return (
        <FormikProvider value={formik}>
            <FormInput className="col-span-3" label="Name" name="name" type="text" />
            <FormInput className="col-span-3" label="Phone number" name="tel" type="text" />
            <FormInput className="col-span-3" label="Created" name="created" type="datetime-local" />
            <FormInput className="col-span-3 mb-2" label="Checked" name="checked" type="datetime-local" />
            <Button onClick={() => router.push('/calls')} color={DesignColor.Violet}>
                Close
            </Button>
            <Button
                onClick={() => deleteCall(formik.values.id).then(() => router.push('/calls'))}
                color={DesignColor.Red}
            >
                Delete
            </Button>
            <Button
                onClick={() => updateCall(formik.values).then(() => router.refresh())}
                disabled={formik.values == formik.initialValues}
                color={DesignColor.Green}
            >
                Save
            </Button>
        </FormikProvider>
    )
}

export default CallForm
